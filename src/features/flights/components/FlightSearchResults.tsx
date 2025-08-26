import { useFlightSearch } from '@/hooks';
import type { Flight } from '@/services';
import {
  FlightLand as ArrivalIcon,
  FlightTakeoff as DepartureIcon,
  Euro as PriceIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

interface FlightCardProps {
  flight: Flight;
  type: 'outbound' | 'return';
}

const FlightCard = ({ flight, type }: FlightCardProps) => {
  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (dateTime: string) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      elevation={2}
      sx={{
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          boxShadow: 4,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {flight.airline}
          </Typography>
          <Chip
            label={type === 'outbound' ? 'Outbound' : 'Return'}
            color={type === 'outbound' ? 'primary' : 'secondary'}
            size="small"
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DepartureIcon color="action" />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {formatTime(flight.departureTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.origin} • {formatDate(flight.departureTime)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ flex: '0 0 120px', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {flight.duration}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ flexGrow: 1, height: 1, bgcolor: 'divider' }} />
              <TimeIcon sx={{ mx: 1, fontSize: 16, color: 'text.secondary' }} />
              <Box sx={{ flexGrow: 1, height: 1, bgcolor: 'divider' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {flight.flightNumber}
            </Typography>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrivalIcon color="action" />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {formatTime(flight.arrivalTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.destination} • {formatDate(flight.arrivalTime)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ flex: '0 0 100px', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {flight.aircraftType}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {flight.availableSeats} seats left
            </Typography>
          </Box>

          <Box sx={{ flex: '0 0 100px', textAlign: 'center' }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
            >
              <PriceIcon sx={{ fontSize: 16 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: 'primary.main' }}
              >
                {flight.price.toFixed(2)}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              per person
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const FlightSearchResults = () => {
  const { searchResults, hasSearched, isLoading } = useFlightSearch();

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" gutterBottom>
          Searching flights...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Finding the best options for your trip
        </Typography>
      </Box>
    );
  }

  if (!hasSearched) {
    return null;
  }

  if (
    !searchResults ||
    (searchResults.outboundFlights.length === 0 &&
      searchResults.returnFlights.length === 0)
  ) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
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

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
          Flight Results
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Found {metadata.totalResults} flights • Search ID: {metadata.searchId}
        </Typography>
      </Box>

      {outboundFlights.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Outbound Flights
          </Typography>
          {outboundFlights.map((flight, index) => (
            <FlightCard
              key={`outbound-${index}`}
              flight={flight}
              type="outbound"
            />
          ))}
        </Box>
      )}

      {returnFlights.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Return Flights
            </Typography>
            {returnFlights.map((flight, index) => (
              <FlightCard
                key={`return-${index}`}
                flight={flight}
                type="return"
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
