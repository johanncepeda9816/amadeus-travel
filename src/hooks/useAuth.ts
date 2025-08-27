/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

export const useAuth = () => {
  const store = useAuthStore();

  useEffect(() => {
    store.initializeAuth();
  }, []);

  return store;
};
