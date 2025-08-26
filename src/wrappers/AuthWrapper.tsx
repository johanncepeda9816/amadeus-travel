import type { UserRole } from '@/lib/types';
import { Box, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
  requiredRole?: UserRole;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
}

const mockAuthState = {
  user: {
    id: '1',
    email: 'admin@amadeus.com',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
  isAuthenticated: true,
  isLoading: false,
};

export const AuthWrapper = ({
  children,
  requiredRole,
  fallback,
  loadingComponent,
}: AuthWrapperProps) => {
  const { user, isAuthenticated, isLoading } = mockAuthState;

  if (isLoading) {
    return (
      loadingComponent || (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      )
    );
  }

  if (!isAuthenticated || !user) {
    return fallback || <Box>Please log in to access this content</Box>;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      fallback || <Box>You do not have permission to access this content</Box>
    );
  }

  return <>{children}</>;
};
