import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Flight as FlightIcon,
  AccessTime,
  AirlineSeatReclineNormal,
} from '@mui/icons-material';
import type { Flight } from '@/services';

interface FlightCardProps {
  flight: Flight;
  currency?: string;
}

export const FlightCard = ({ flight, currency = 'COP' }: FlightCardProps) => {
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getAvailabilityColor = (seats: number) => {
    if (seats > 20) return 'success';
    if (seats > 10) return 'warning';
    return 'error';
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
        },
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightIcon color="primary" />
              <Typography variant="h6" fontWeight="600">
                {flight.airline}
              </Typography>
              <Chip
                label={flight.flightNumber}
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>
            <Typography variant="h5" fontWeight="700" color="primary">
              {formatPrice(flight.price)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4" fontWeight="700" color="text.primary">
                {formatTime(flight.departureTime)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(flight.departureTime)}
              </Typography>
              <Typography variant="h6" fontWeight="600" color="text.primary">
                {flight.origin}
              </Typography>
            </Box>

            <Box
              sx={{
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {flight.duration}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '60px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {flight.aircraftType}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4" fontWeight="700" color="text.primary">
                {formatTime(flight.arrivalTime)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(flight.arrivalTime)}
              </Typography>
              <Typography variant="h6" fontWeight="600" color="text.primary">
                {flight.destination}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip
                label={flight.cabinClass}
                size="small"
                color="secondary"
                variant="outlined"
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AirlineSeatReclineNormal fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {flight.availableSeats} seats
                </Typography>
                <Chip
                  label={
                    flight.availableSeats > 20
                      ? 'Available'
                      : flight.availableSeats > 10
                        ? 'Few left'
                        : 'Last seats'
                  }
                  size="small"
                  color={getAvailabilityColor(flight.availableSeats)}
                  variant="filled"
                />
              </Box>
            </Box>

            <IconButton
              color="primary"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                px: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="button" fontWeight="600">
                Select
              </Typography>
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
