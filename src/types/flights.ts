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
  success: boolean;
  message: string;
  data: {
    outboundFlights: Flight[];
    returnFlights: Flight[];
    metadata: SearchMetadata;
  };
  error: string | null;
}

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

export interface LocationResponse {
  success: boolean;
  message: string;
  data: {
    origins: Location[];
    destinations: Location[];
  };
  error: string | null;
}

export interface SingleLocationResponse {
  success: boolean;
  message: string;
  data: Location[];
  error: string | null;
}
