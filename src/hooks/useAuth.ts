import type { LoginFormData } from '@/features/auth/schemas';
import type { AuthState, User } from '@/lib/types';
import { UserRole } from '@/lib/types';
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

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

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
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setLoginError(null);
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
