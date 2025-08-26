import type { LoginFormData } from '@/features/auth/schemas';
import { notifications } from '@/lib';
import type { AuthState } from '@/lib/types';
import { authService, tokenManager } from '@/services';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  // Check for existing token on app load
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = tokenManager.get();

      if (!token) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        if (response.success) {
          setAuthState({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          tokenManager.remove();
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        tokenManager.remove();
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkExistingAuth();
  }, []);

  const login = async (credentials: LoginFormData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    setLoginError(null);

    try {
      const response = await authService.login(credentials);

      if (response.success) {
        tokenManager.set(response.data.token);

        setAuthState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });

        notifications.success(`Welcome back, ${response.data.user.name}!`);
        return { success: true };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      setLoginError(errorMessage);

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout errors, proceed with local cleanup
      console.warn('Logout request failed:', error);
    } finally {
      tokenManager.remove();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      setLoginError(null);
      notifications.info('You have been logged out');
    }
  };

  const clearError = () => {
    setLoginError(null);
  };

  return {
    ...authState,
    loginError,
    login,
    logout,
    clearError,
  };
};
