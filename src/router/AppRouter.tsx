import { LoginForm } from '@/features';
import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const HomePage = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Welcome to Amadeus Travel</h1>
    <p>Discover amazing flights and hotels worldwide!</p>
    <p>Browse our offers - no account required</p>
  </div>
);

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.HOME.path} element={<HomePage />} />

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
