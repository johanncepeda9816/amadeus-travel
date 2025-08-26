import type { FlightSearchFormData } from '@/features/flights/schemas';
import { api } from './api';

export interface Flight {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  aircraftType: string;
  availableSeats: number;
  cabinClass: string;
}

export interface SearchMetadata {
  searchId: string;
  searchTime: string;
  totalResults: number;
  currency: string;
}

export interface FlightSearchResponse {
  data: {
    outboundFlights: Flight[];
    returnFlights: Flight[];
    metadata: SearchMetadata;
    error?: string;
    message?: string;
    success: boolean;
  };
}

export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string | null;
  tripType: string;
  passengers: number;
}

const transformFormDataToRequest = (
  formData: FlightSearchFormData
): FlightSearchRequest => {
  return {
    origin: formData.origin,
    destination: formData.destination,
    departureDate: formData.departureDate.toISOString().split('T')[0],
    returnDate: formData.returnDate
      ? formData.returnDate.toISOString().split('T')[0]
      : null,
    tripType: formData.tripType,
    passengers: formData.passengers,
  };
};

export const searchFlights = async (
  searchData: FlightSearchFormData
): Promise<FlightSearchResponse> => {
  const requestData = transformFormDataToRequest(searchData);

  const response = await api.post<FlightSearchResponse>(
    '/flights/search',
    requestData
  );
  return response.data;
};

export const flightService = {
  searchFlights,
};
