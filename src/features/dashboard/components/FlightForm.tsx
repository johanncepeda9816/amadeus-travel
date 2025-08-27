import { BaseButton, DateInput, FormikInput, SelectInput } from '@/components';
import {
  Alert,
  Box,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { Form, Formik } from 'formik';
import type { AdminFlight } from '@/types/flights';
import { flightSchema, initialFlightValues } from '../schemas';
import type { FlightFormData } from '../schemas';

interface FlightFormProps {
  flight?: AdminFlight;
  isLoading?: boolean;
  error?: string | null;
  onSubmit: (values: FlightFormData) => Promise<void>;
  onCancel: () => void;
}

const CABIN_CLASSES = ['Economy', 'Business', 'First'] as const;

export const FlightForm = ({
  flight,
  isLoading = false,
  error,
  onSubmit,
  onCancel,
}: FlightFormProps) => {
  const isEditMode = !!flight;

  const getInitialValues = (): FlightFormData => {
    if (flight) {
      return {
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: new Date(flight.departureTime),
        arrivalTime: new Date(flight.arrivalTime),
        duration: flight.duration,
        price: flight.price,
        aircraftType: flight.aircraftType,
        availableSeats: flight.availableSeats,
        cabinClass: flight.cabinClass as 'Economy' | 'Business' | 'First',
        active: flight.active,
      };
    }
    return initialFlightValues;
  };

  const handleSubmit = async (values: FlightFormData) => {
    await onSubmit(values);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}
      >
        {isEditMode ? 'Edit Flight' : 'Create New Flight'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={getInitialValues()}
        validationSchema={flightSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="flightNumber"
                    label="Flight Number"
                    placeholder="e.g., AM123"
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="airline"
                    label="Airline"
                    placeholder="e.g., Amadeus Airlines"
                    useFormik
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="origin"
                    label="Origin"
                    placeholder="e.g., Madrid"
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="destination"
                    label="Destination"
                    placeholder="e.g., Paris"
                    useFormik
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <DateInput
                    name="departureTime"
                    label="Departure Date & Time"
                    useFormik
                    minDate={new Date()}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <DateInput
                    name="arrivalTime"
                    label="Arrival Date & Time"
                    useFormik
                    minDate={values.departureTime || new Date()}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="duration"
                    label="Duration"
                    placeholder="e.g., 1h 45m"
                    helperText="Format: XhYm (e.g., 2h 30m)"
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="price"
                    label="Price"
                    type="number"
                    placeholder="299.99"
                    inputProps={{ step: 0.01, min: 0 }}
                    useFormik
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="aircraftType"
                    label="Aircraft Type"
                    placeholder="e.g., Boeing 737"
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <SelectInput name="cabinClass" label="Cabin Class" useFormik>
                    {CABIN_CLASSES.map((cabinClass) => (
                      <MenuItem key={cabinClass} value={cabinClass}>
                        {cabinClass}
                      </MenuItem>
                    ))}
                  </SelectInput>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <FormikInput
                    name="availableSeats"
                    label="Available Seats"
                    type="number"
                    placeholder="150"
                    inputProps={{ min: 1, max: 500 }}
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.active}
                          onChange={(e) =>
                            setFieldValue('active', e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Active Flight
                        </Typography>
                      }
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'flex-end',
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <BaseButton
                  type="button"
                  variant="outlined"
                  size="large"
                  onClick={onCancel}
                  disabled={isLoading}
                  sx={{ minWidth: 120 }}
                >
                  Cancel
                </BaseButton>
                <BaseButton
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isLoading}
                  sx={{ minWidth: 120 }}
                >
                  {isEditMode ? 'Update Flight' : 'Create Flight'}
                </BaseButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
