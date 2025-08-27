import {
  BaseButton,
  DateInput,
  LocationAutocomplete,
  SelectInput,
} from '@/components';
import { useFlightSearchStore } from '../store/flightSearchStore';
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
import { useFlightSearch } from '@/hooks';

export const FlightSearchForm = () => {
  const { searchFlights, isLoading, clearError, clearSearch, lastSearchData } =
    useFlightSearchStore();

  const { availableOrigins, availableDestinations, isLoadingLocations } =
    useFlightSearch();

  const initialValues: FlightSearchFormData = lastSearchData
    ? {
        ...lastSearchData,
        departureDate:
          lastSearchData.departureDate instanceof Date
            ? lastSearchData.departureDate
            : new Date(lastSearchData.departureDate),
        returnDate: lastSearchData.returnDate
          ? lastSearchData.returnDate instanceof Date
            ? lastSearchData.returnDate
            : new Date(lastSearchData.returnDate)
          : null,
      }
    : {
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

  const defaultButtonProps = {
    size: 'large' as const,
    sx: { flex: { xs: 1, sm: 'auto' } },
  };

  const clearSearchAction = (
    resetForm: (nextState?: Partial<unknown>) => void
  ) => {
    clearSearch();
    clearError();
    resetForm({
      values: {
        origin: '',
        destination: '',
        departureDate: new Date(),
        returnDate: null,
        tripType: 'roundtrip',
        passengers: 1,
      },
    });
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
        enableReinitialize={true}
      >
        {({ values, setFieldValue, resetForm }) => (
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
                  <LocationAutocomplete
                    name="origin"
                    label="From"
                    placeholder="Select origin city"
                    locations={availableOrigins}
                    isLoading={isLoadingLocations}
                    useFormik
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <LocationAutocomplete
                    name="destination"
                    label="To"
                    placeholder="Select destination city"
                    locations={availableDestinations}
                    isLoading={isLoadingLocations}
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

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <BaseButton
                  {...defaultButtonProps}
                  type="button"
                  variant="outlined"
                  onClick={() => clearSearchAction(resetForm)}
                  sx={{
                    ...defaultButtonProps.sx,
                    minWidth: { sm: '140px' },
                  }}
                >
                  Clear Search
                </BaseButton>
                <BaseButton
                  {...defaultButtonProps}
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  sx={{
                    ...defaultButtonProps.sx,
                    flex: 1,
                  }}
                >
                  Search Flights
                </BaseButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
