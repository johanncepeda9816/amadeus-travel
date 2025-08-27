import { BaseButton, FormikInput } from '@/components';
import { useAuth } from '@/hooks';
import { APP_ROUTES, UserRole } from '@/lib';
import { Alert, Box, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData } from '../schemas';
import { loginSchema } from '../schemas';

export const LoginForm = () => {
  const { login, isLoading, loginError, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormData) => {
    clearError();
    const result = await login(values);

    if (result.success && result.user) {
      // Redirect based on user role
      if (result.user.role === UserRole.ADMIN) {
        navigate(APP_ROUTES.DASHBOARD.path);
      } else {
        navigate(APP_ROUTES.HOME.path);
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.50"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Sign in to your Amadeus Travel account
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormikInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              <FormikInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <BaseButton
                type="submit"
                variant="contained"
                size="large"
                loading={isLoading}
                sx={{ mt: 2 }}
              >
                Sign In
              </BaseButton>
            </Box>
          </Form>
        </Formik>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mt={2}
        >
          Demo: admin@amadeus.com / password123 or user@amadeus.com /
          password123
        </Typography>
      </Paper>
    </Box>
  );
};
