import { Box, Card, CardContent, Chip, Typography, Stack } from '@mui/material';
import { Flight as FlightIcon, AccessTime } from '@mui/icons-material';
import type { Flight } from '@/services';
import { BaseButton } from '@/components';

interface FlightCardSummaryProps {
  flight: Flight;
  currency?: string;
}

export const FlightCardSummary = ({
  flight,
  currency = 'COP',
}: FlightCardSummaryProps) => {
  const formatters = {
    time: (dateTimeString: string) => {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    },
    price: (price: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
      }).format(price);
    },
    date: (dateTimeString: string) => {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      });
    },
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
        },
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack spacing={2} sx={{ flex: 1 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightIcon color="primary" fontSize="small" />
              <Typography variant="subtitle1" fontWeight="600">
                {flight.airline}
              </Typography>
              <Chip
                label={flight.flightNumber}
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>
            <Typography variant="h6" fontWeight="700" color="primary">
              {formatters.price(flight.price)}
            </Typography>
          </Box>

          {/* Departure */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="700" color="text.primary">
              {formatters.time(flight.departureTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {formatters.date(flight.departureTime)}
            </Typography>
            <Typography variant="h6" fontWeight="600" color="text.primary">
              {flight.origin}
            </Typography>
          </Box>

          {/* Duration */}
          <Box sx={{ textAlign: 'center', py: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                mb: 1,
              }}
            >
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {flight.duration}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '2px',
                height: '20px',
                bgcolor: 'primary.main',
                borderRadius: 1,
                mx: 'auto',
              }}
            />
          </Box>

          {/* Arrival */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="700" color="text.primary">
              {formatters.time(flight.arrivalTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {formatters.date(flight.arrivalTime)}
            </Typography>
            <Typography variant="h6" fontWeight="600" color="text.primary">
              {flight.destination}
            </Typography>
          </Box>

          {/* CTA Button */}
          <Box sx={{ mt: 'auto' }}>
            <BaseButton
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              sx={{ borderRadius: 20 }}
            >
              Book
            </BaseButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
