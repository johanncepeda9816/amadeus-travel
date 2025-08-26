import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import type { UserRole } from '@/lib/types';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

// ProtectedRoute: For routes that require authentication
// Will be used for: /bookings, /profile, /admin, etc.
// Public routes like / and /login don't need this guard

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={APP_ROUTES.LOGIN.path} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
