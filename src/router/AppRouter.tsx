import { Layout } from '@/components';
import { HomePage, LoginForm } from '@/features';
import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_ROUTES.HOME.path}
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        <Route
          path={APP_ROUTES.LOGIN.path}
          element={
            isAuthenticated ? (
              <Navigate to={APP_ROUTES.HOME.path} replace />
            ) : (
              <LoginForm />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to={APP_ROUTES.HOME.path} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
