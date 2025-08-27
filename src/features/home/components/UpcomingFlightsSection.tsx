import { FlightCard } from '@/features/flights/components/FlightCard';
import { useUpcomingFlights } from '@/hooks/useUpcomingFlights';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

export const UpcomingFlightsSection = () => {
  const { upcomingFlights, isLoading } = useUpcomingFlights();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container maxWidth={'lg'} sx={{ mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Upcoming Flights
      </Typography>
      <Grid container spacing={2}>
        {upcomingFlights.map((flight) => (
          <Grid size={4} key={flight.flightNumber}>
            <FlightCard flight={flight} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
