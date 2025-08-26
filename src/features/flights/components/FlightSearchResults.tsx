import { useFlightSearchStore } from '../store/flightSearchStore';
import { FlightCard } from './FlightCard';
import {
  Box,
  Divider,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';

export const FlightSearchResults = () => {
  const { searchResults, hasSearched, isLoading, searchError } =
    useFlightSearchStore();

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Searching flights...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Finding the best options for your trip
        </Typography>
      </Box>
    );
  }

  if (searchError) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          <Typography variant="body1">{searchError}</Typography>
        </Alert>
      </Box>
    );
  }

  if (!searchResults || !hasSearched) {
    return null;
  }

  if (
    (searchResults.outboundFlights?.length || 0) === 0 &&
    (searchResults.returnFlights?.length || 0) === 0
  ) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No flights found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search criteria
        </Typography>
      </Box>
    );
  }

  const { outboundFlights, returnFlights, metadata } = searchResults;
  const totalFlights = outboundFlights.length + returnFlights.length;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Flight Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found {totalFlights} available flights
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Search performed on{' '}
          {new Date(metadata.searchTime).toLocaleString('en-US')}
        </Typography>
      </Box>

      {outboundFlights.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}
          >
            Outbound Flights ({outboundFlights.length})
          </Typography>
          <Stack spacing={2}>
            {outboundFlights.map((flight, index) => (
              <FlightCard
                key={`outbound-${flight.flightNumber}-${index}`}
                flight={flight}
                currency={metadata.currency}
              />
            ))}
          </Stack>
        </Box>
      )}

      {returnFlights.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Box>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: 600, color: 'secondary.main' }}
            >
              Return Flights ({returnFlights.length})
            </Typography>
            <Stack spacing={2}>
              {returnFlights.map((flight, index) => (
                <FlightCard
                  key={`return-${flight.flightNumber}-${index}`}
                  flight={flight}
                  currency={metadata.currency}
                />
              ))}
            </Stack>
          </Box>
        </>
      )}

      <Box
        sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Typography variant="caption" color="text.secondary">
          Search ID: {metadata.searchId} • Currency: {metadata.currency}
        </Typography>
      </Box>
    </Box>
  );
};
