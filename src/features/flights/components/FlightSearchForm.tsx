import { BaseButton, DateInput, FormikInput, SelectInput } from '@/components';
import { useFlightSearch } from '@/hooks';
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import type { FlightSearchFormData } from '../schemas';
import { flightSearchSchema } from '../schemas';

export const FlightSearchForm = () => {
  const { searchFlights, isLoading, clearError } = useFlightSearch();

  const initialValues: FlightSearchFormData = {
    origin: '',
    destination: '',
    departureDate: new Date(),
    returnDate: null,
    tripType: 'roundtrip',
    passengers: 1,
  };

  const handleSubmit = async (values: FlightSearchFormData) => {
    try {
      clearError();
      await searchFlights(values);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        Search Flights
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={flightSearchSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              <FormControl component="fieldset">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Trip Type
                </Typography>
                <RadioGroup
                  row
                  value={values.tripType}
                  onChange={(e) => {
                    setFieldValue('tripType', e.target.value);
                    if (e.target.value === 'oneway') {
                      setFieldValue('returnDate', null);
                    }
                  }}
                >
                  <FormControlLabel
                    value="roundtrip"
                    control={<Radio />}
                    label="Round Trip"
                  />
                  <FormControlLabel
                    value="oneway"
                    control={<Radio />}
                    label="One Way"
                  />
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <FormikInput
                    name="origin"
                    label="From"
                    placeholder="Origin city or airport"
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <FormikInput
                    name="destination"
                    label="To"
                    placeholder="Destination city or airport"
                    useFormik
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <DateInput
                    name="departureDate"
                    label="Departure Date"
                    useFormik
                    minDate={new Date()}
                  />
                </Box>
                {values.tripType === 'roundtrip' && (
                  <Box sx={{ flex: 1, minWidth: 200 }}>
                    <DateInput
                      name="returnDate"
                      label="Return Date"
                      useFormik
                      minDate={values.departureDate || new Date()}
                    />
                  </Box>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <SelectInput name="passengers" label="Passengers" useFormik>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </MenuItem>
                    ))}
                  </SelectInput>
                </Box>
              </Box>

              <BaseButton
                type="submit"
                variant="contained"
                size="large"
                loading={isLoading}
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background:
                    'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                  },
                }}
              >
                Search Flights
              </BaseButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
