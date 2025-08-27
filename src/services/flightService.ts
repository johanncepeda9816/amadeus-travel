import type { FlightSearchFormData } from '@/features/flights/schemas';
import type {
  FlightSearchRequest,
  FlightSearchResponse,
} from '@/types/flights';
import type { LocationResponse, SingleLocationResponse } from '@/types/flights';
import { api } from './api';

const BASE_URL = '/flights';

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
    `${BASE_URL}/search`,
    requestData
  );
  return response.data;
};

export const getAvailableLocations =
  async (): Promise<SingleLocationResponse> => {
    const response = await api.get<SingleLocationResponse>(
      `${BASE_URL}/locations`
    );
    return response.data;
  };

export const getAvailableDestinations = async (): Promise<LocationResponse> => {
  const response = await api.get<LocationResponse>(
    `${BASE_URL}/locations/destinations`
  );
  return response.data;
};

export const flightService = {
  searchFlights,
  getAvailableLocations,
  getAvailableDestinations,
};
