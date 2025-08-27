import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginFormData } from '@/features/auth/schemas';
import { notifications } from '@/lib';
import type { User } from '@/lib/types';
import { authService, tokenManager } from '@/services';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError: string | null;
}

interface AuthActions {
  login: (
    credentials: LoginFormData
  ) => Promise<{ success: boolean; user?: User | null; error?: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      loginError: null,

      login: async (credentials: LoginFormData) => {
        set({ isLoading: true, loginError: null });

        try {
          const response = await authService.login(credentials);

          if (response.success) {
            tokenManager.set(response.data.token);

            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });

            notifications.success(`Welcome back, ${response.data.user.name}!`);
            return { success: true, user: response.data.user };
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Login failed';

          set({
            loginError: errorMessage,
            isLoading: false,
          });

          return { success: false, error: errorMessage, user: null };
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          console.warn('Logout request failed:', error);
        } finally {
          tokenManager.remove();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            loginError: null,
          });
          notifications.info('You have been logged out');
        }
      },

      clearError: () => {
        set({ loginError: null });
      },

      initializeAuth: async () => {
        const token = tokenManager.get();

        if (!token) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        try {
          const response = await authService.getCurrentUser();

          if (response.success && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            tokenManager.remove();
            set({ isLoading: false });
          }
        } catch {
          tokenManager.remove();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      storage: {
        getItem: (name: string) => {
          const value = localStorage.getItem(name);
          if (!value) return null;
          try {
            return JSON.parse(value);
          } catch {
            return null;
          }
        },
        setItem: (name: string, value: unknown) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
