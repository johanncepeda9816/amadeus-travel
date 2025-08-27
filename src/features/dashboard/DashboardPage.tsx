import { Box, Typography } from '@mui/material';

export const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to the admin dashboard. Flight management functionality coming
        soon.
      </Typography>
    </Box>
  );
};
