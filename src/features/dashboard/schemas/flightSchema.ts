import * as yup from 'yup';

const CABIN_CLASSES = ['Economy', 'Business', 'First'] as const;

export const flightSchema = yup.object({
  flightNumber: yup
    .string()
    .required('Flight number is required')
    .min(2, 'Flight number must be at least 2 characters')
    .max(10, 'Flight number must be at most 10 characters'),

  airline: yup
    .string()
    .required('Airline is required')
    .min(2, 'Airline must be at least 2 characters')
    .max(50, 'Airline must be at most 50 characters'),

  origin: yup
    .string()
    .required('Origin is required')
    .min(2, 'Origin must be at least 2 characters')
    .max(50, 'Origin must be at most 50 characters'),

  destination: yup
    .string()
    .required('Destination is required')
    .min(2, 'Destination must be at least 2 characters')
    .max(50, 'Destination must be at most 50 characters'),

  departureTime: yup
    .date()
    .required('Departure time is required')
    .min(new Date(), 'Departure time must be in the future'),

  arrivalTime: yup
    .date()
    .required('Arrival time is required')
    .when('departureTime', (departureTime, schema) => {
      if (departureTime && departureTime[0]) {
        return schema.min(
          departureTime[0],
          'Arrival time must be after departure time'
        );
      }
      return schema;
    }),

  duration: yup
    .string()
    .required('Duration is required')
    .matches(
      /^\d+h\s\d+m$/,
      'Duration must be in format "XhYm" (e.g., "2h 30m")'
    ),

  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be greater than 0')
    .max(999999, 'Price is too high'),

  aircraftType: yup
    .string()
    .required('Aircraft type is required')
    .min(2, 'Aircraft type must be at least 2 characters')
    .max(50, 'Aircraft type must be at most 50 characters'),

  availableSeats: yup
    .number()
    .required('Available seats is required')
    .integer('Available seats must be a whole number')
    .min(1, 'Available seats must be at least 1')
    .max(500, 'Available seats cannot exceed 500'),

  cabinClass: yup
    .string()
    .required('Cabin class is required')
    .oneOf(CABIN_CLASSES, 'Invalid cabin class'),

  active: yup.boolean().default(true),
});

export type FlightFormData = yup.InferType<typeof flightSchema>;

export const initialFlightValues: FlightFormData = {
  flightNumber: '',
  airline: '',
  origin: '',
  destination: '',
  departureTime: new Date(),
  arrivalTime: new Date(),
  duration: '',
  price: 0,
  aircraftType: '',
  availableSeats: 100,
  cabinClass: 'Economy',
  active: true,
};
