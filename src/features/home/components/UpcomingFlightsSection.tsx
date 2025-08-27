import { FlightCardSummary } from '@/features/flights/components/FlightCardSummary';
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
    <Grid container maxWidth={'lg'} sx={{ mx: 'auto', px: 4 }}>
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
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {upcomingFlights.map((flight) => (
          <Grid size={4} key={flight.flightNumber} sx={{ display: 'flex' }}>
            <FlightCardSummary flight={flight} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
