import type { UserRole as UserRoleType } from './types';
import { UserRole } from './types';

export interface AppRoute {
  path: string;
  name: string;
  allowedRoles: UserRoleType[];
  isPublic?: boolean;
}

export const APP_ROUTES = {
  LOGIN: {
    path: '/login',
    name: 'Login',
    allowedRoles: [UserRole.ADMIN, UserRole.USER],
    isPublic: true,
  },
} as const satisfies Record<string, AppRoute>;

export const getRoutesByRole = (role: UserRoleType): AppRoute[] => {
  return Object.values(APP_ROUTES).filter((route) =>
    route.allowedRoles.includes(role as never)
  );
};

export const getPublicRoutes = (): AppRoute[] => {
  return Object.values(APP_ROUTES).filter((route) => route.isPublic);
};

export const canAccessRoute = (
  route: AppRoute,
  userRole?: UserRoleType
): boolean => {
  if (route.isPublic) return true;
  if (!userRole) return false;
  return route.allowedRoles.includes(userRole as UserRoleType);
};
