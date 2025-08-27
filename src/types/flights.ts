import type { BaseResponse } from './global';

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

export interface AdminFlight extends Flight {
  id: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFlightRequest {
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
  cabinClass: 'Economy' | 'Business' | 'First';
  active?: boolean;
}

export type UpdateFlightRequest = Partial<CreateFlightRequest>;

export interface PageableResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      ascending: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface SearchMetadata {
  searchId: string;
  searchTime: string;
  totalResults: number;
  currency: string;
}

export type FlightSearchResponse = BaseResponse<{
  outboundFlights: Flight[];
  returnFlights: Flight[];
  metadata: SearchMetadata;
}>;

export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string | null;
  tripType: string;
  passengers: number;
}

export interface Location {
  name: string;
  code: string;
}

export type LocationResponse = BaseResponse<{
  origins: Location[];
  destinations: Location[];
}>;

export type SingleLocationResponse = BaseResponse<Location[]>;

export type UpcomingFlightsResponse = BaseResponse<Flight[]>;

export type AdminFlightResponse = BaseResponse<AdminFlight>;
export type AdminFlightsResponse = BaseResponse<PageableResponse<AdminFlight>>;
export type DeleteFlightResponse = BaseResponse<null>;
