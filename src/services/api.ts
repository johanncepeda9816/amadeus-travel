import { notifications } from '@/lib/notifications';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const TOKEN_COOKIE_NAME = 'amadeus_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    notifications.error('Request failed to send');
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;

    if (!response) {
      notifications.error('Network error - please check your connection');
      return Promise.reject(error);
    }

    switch (response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        Cookies.remove(TOKEN_COOKIE_NAME);
        notifications.error('Session expired - please log in again');
        break;

      case 403:
        notifications.error('Access denied - insufficient permissions');
        break;

      case 404:
        notifications.error('Resource not found');
        break;

      case 422: {
        // Validation errors
        const errorData = response.data as { message?: string };
        const message = errorData?.message || 'Validation failed';
        notifications.error(message);
        break;
      }

      case 500:
        notifications.error('Server error - please try again later');
        break;

      default: {
        const errorData = response.data as { message?: string };
        const defaultMessage =
          errorData?.message || 'An unexpected error occurred';
        notifications.error(defaultMessage);
        break;
      }
    }

    return Promise.reject(error);
  }
);

// Token management
export const tokenManager = {
  get: () => Cookies.get(TOKEN_COOKIE_NAME),

  set: (token: string, options?: Cookies.CookieAttributes) => {
    const defaultOptions: Cookies.CookieAttributes = {
      expires: 7, // 7 days
      secure: import.meta.env.PROD,
      sameSite: 'strict',
    };

    Cookies.set(TOKEN_COOKIE_NAME, token, { ...defaultOptions, ...options });
  },

  remove: () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
  },

  isValid: () => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    return !!token;
  },
};

export { api };
