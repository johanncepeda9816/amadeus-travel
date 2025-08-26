import { Layout } from '@/components';
import { LoginForm } from '@/features';
import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import { Box, Container, Typography } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Discover Your Next Adventure
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Find the best flights and hotels worldwide
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Start exploring amazing destinations and create unforgettable memories
        </Typography>
      </Box>

      {/* TODO: Add search components here */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Search functionality coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

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
