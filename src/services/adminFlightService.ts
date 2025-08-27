import type {
  AdminFlightResponse,
  AdminFlightsResponse,
  CreateFlightRequest,
  DeleteFlightResponse,
  UpdateFlightRequest,
} from '@/types/flights';
import { api } from './api';

const BASE_URL = '/flights/admin';

export interface FlightListParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export const createFlight = async (
  flightData: CreateFlightRequest
): Promise<AdminFlightResponse> => {
  const response = await api.post<AdminFlightResponse>(BASE_URL, flightData);
  return response.data;
};

export const getFlightById = async (
  id: number
): Promise<AdminFlightResponse> => {
  const response = await api.get<AdminFlightResponse>(`${BASE_URL}/${id}`);
  return response.data;
};

export const getFlights = async (
  params: FlightListParams = {}
): Promise<AdminFlightsResponse> => {
  const {
    page = 0,
    size = 20,
    sortBy = 'departureTime',
    sortDir = 'asc',
  } = params;

  const response = await api.get<AdminFlightsResponse>(BASE_URL, {
    params: { page, size, sortBy, sortDir },
  });
  return response.data;
};

export const updateFlight = async (
  id: number,
  flightData: UpdateFlightRequest
): Promise<AdminFlightResponse> => {
  const response = await api.put<AdminFlightResponse>(
    `${BASE_URL}/${id}`,
    flightData
  );
  return response.data;
};

export const deleteFlight = async (
  id: number
): Promise<DeleteFlightResponse> => {
  const response = await api.delete<DeleteFlightResponse>(`${BASE_URL}/${id}`);
  return response.data;
};

export const adminFlightService = {
  createFlight,
  getFlightById,
  getFlights,
  updateFlight,
  deleteFlight,
};
