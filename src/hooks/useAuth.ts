import type { LoginFormData } from '@/features/auth/schemas';
import { UserRole, notifications } from '@/lib';
import type { AuthState, User } from '@/lib/types';
import { tokenManager } from '@/services';
import { useState } from 'react';

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@amadeus.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
  },
  {
    id: '2',
    email: 'user@amadeus.com',
    name: 'Regular User',
    role: UserRole.USER,
  },
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const login = async (credentials: LoginFormData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    setLoginError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = MOCK_USERS.find((u) => u.email === credentials.email);

      if (!user || credentials.password !== 'password123') {
        throw new Error('Invalid credentials');
      }

      // Mock token for demo
      const mockToken = `mock_token_${user.id}_${Date.now()}`;
      tokenManager.set(mockToken);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      notifications.success(`Welcome back, ${user.name}!`);
      return { success: true };
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

  const logout = () => {
    tokenManager.remove();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setLoginError(null);
    notifications.info('You have been logged out');
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
