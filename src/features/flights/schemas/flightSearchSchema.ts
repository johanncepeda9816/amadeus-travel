import * as yup from 'yup';

export const flightSearchSchema = yup.object({
  origin: yup
    .string()
    .required('Origin is required')
    .min(2, 'Origin must be at least 2 characters'),
  destination: yup
    .string()
    .required('Destination is required')
    .min(2, 'Destination must be at least 2 characters'),
  departureDate: yup
    .date()
    .required('Departure date is required')
    .min(new Date(), 'Departure date cannot be in the past'),
  returnDate: yup
    .date()
    .nullable()
    .when('tripType', {
      is: 'roundtrip',
      then: (schema) =>
        schema
          .required('Return date is required for round trip')
          .min(
            yup.ref('departureDate'),
            'Return date must be after departure date'
          ),
      otherwise: (schema) => schema.nullable(),
    }),
  tripType: yup
    .string()
    .oneOf(['oneway', 'roundtrip'], 'Invalid trip type')
    .required('Trip type is required'),
  passengers: yup
    .number()
    .required('Number of passengers is required')
    .min(1, 'At least 1 passenger is required')
    .max(9, 'Maximum 9 passengers allowed')
    .integer('Number of passengers must be a whole number'),
});

export type FlightSearchFormData = yup.InferType<typeof flightSearchSchema>;
