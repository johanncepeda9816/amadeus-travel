import { useAuth } from '@/hooks';
import type { UserRole } from '@/lib/types';
import { Box, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
  requiredRole?: UserRole;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
}

// AuthWrapper now uses useAuth hook instead of mock state

export const AuthWrapper = ({
  children,
  requiredRole,
  fallback,
  loadingComponent,
}: AuthWrapperProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

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
