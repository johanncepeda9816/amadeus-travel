import { LoginForm } from '@/features';
import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import { Box, Button, Typography } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Amadeus Travel
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Discover amazing flights and hotels worldwide!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Browse our offers - no account required
      </Typography>

      {isAuthenticated && user ? (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Welcome back, {user.name}!
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Role: {user.role} | Email: {user.email}
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            href={APP_ROUTES.LOGIN.path}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

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
