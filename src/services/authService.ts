import type { LoginFormData } from '@/features/auth/schemas';
import type { User } from '@/lib/types';
import { api } from './api';

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const BASE_URL = '/auth';

export const authService = {
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      `${BASE_URL}/login`,
      credentials
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post(`${BASE_URL}/logout`);
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>(`${BASE_URL}/me`);
    return response.data;
  },

  async refreshToken(): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(`${BASE_URL}/refresh`);
    return response.data;
  },
};
