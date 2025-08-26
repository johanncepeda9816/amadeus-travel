import { LoginForm } from '@/features';
import { ProtectedRoute } from '@/guards';
import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const HomePage = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Welcome to Amadeus Travel</h1>
    <p>Home page - in progressn!</p>
  </div>
);

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_ROUTES.LOGIN.path}
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
