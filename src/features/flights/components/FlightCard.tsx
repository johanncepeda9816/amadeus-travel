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
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={{ xs: 3, sm: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
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
            <Typography
              fontWeight="700"
              color="primary"
              sx={{
                alignSelf: { xs: 'flex-end', sm: 'auto' },
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              {formatPrice(flight.price)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 3, md: 0 },
            }}
          >
            <Box
              sx={{
                textAlign: 'center',
                flex: { md: 1 },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              <Typography
                fontWeight="700"
                color="text.primary"
                sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
              >
                {formatTime(flight.departureTime)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(flight.departureTime)}
              </Typography>
              <Typography
                fontWeight="600"
                color="text.primary"
                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
              >
                {flight.origin}
              </Typography>
            </Box>

            <Box
              sx={{
                textAlign: 'center',
                flex: { md: 1 },
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'center',
                justifyContent: { xs: 'space-between', md: 'center' },
                gap: 1,
                width: { xs: '100%', md: 'auto' },
                px: { xs: 2, md: 0 },
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
                  width: { xs: '40px', md: '60px' },
                  height: '2px',
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                  display: { xs: 'none', md: 'block' },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {flight.aircraftType}
              </Typography>
            </Box>

            <Box
              sx={{
                textAlign: 'center',
                flex: { md: 1 },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              <Typography
                fontWeight="700"
                color="text.primary"
                sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
              >
                {formatTime(flight.arrivalTime)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(flight.arrivalTime)}
              </Typography>
              <Typography
                fontWeight="600"
                color="text.primary"
                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
              >
                {flight.destination}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 2 },
                alignItems: { xs: 'flex-start', sm: 'center' },
              }}
            >
              <Chip
                label={flight.cabinClass}
                size="small"
                color="secondary"
                variant="outlined"
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  flexWrap: 'wrap',
                }}
              >
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
                px: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 1 },
                borderRadius: 2,
                width: { xs: '100%', sm: 'auto' },
                mt: { xs: 1, sm: 0 },
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
