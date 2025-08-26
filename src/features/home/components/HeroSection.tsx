import { Box, Container, Typography } from '@mui/material';

export const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Discover Your Next Adventure
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            mb: 4,
            opacity: 0.9,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Find the best flights and hotels worldwide. Create unforgettable
          memories with exclusive deals and personalized recommendations.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', md: '1rem' },
            opacity: 0.8,
          }}
        >
          Start your journey today
        </Typography>
      </Container>
    </Box>
  );
};
