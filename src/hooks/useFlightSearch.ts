import type { FlightSearchFormData } from '@/features/flights/schemas';
import { notifications } from '@/lib';
import type { FlightSearchResponse } from '@/services';
import { flightService } from '@/services';
import { useState } from 'react';

interface UseFlightSearchState {
  searchResults: FlightSearchResponse['data'] | null;
  isLoading: boolean;
  searchError: string | null;
  hasSearched: boolean;
}

export const useFlightSearch = () => {
  const [state, setState] = useState<UseFlightSearchState>({
    searchResults: null,
    isLoading: false,
    searchError: null,
    hasSearched: false,
  });

  const searchFlights = async (searchData: FlightSearchFormData) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      searchError: null,
    }));

    try {
      const data = await flightService.searchFlights(searchData);
      const results = data.data;

      setState((prev) => ({
        ...prev,
        searchResults: results,
        isLoading: false,
        hasSearched: true,
      }));

      return results;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to search flights. Please try again.';

      setState((prev) => ({
        ...prev,
        searchError: errorMessage,
        isLoading: false,
        hasSearched: true,
      }));

      notifications.error(errorMessage);
      throw error;
    }
  };

  const clearSearch = () => {
    setState({
      searchResults: null,
      isLoading: false,
      searchError: null,
      hasSearched: false,
    });
  };

  const clearError = () => {
    setState((prev) => ({
      ...prev,
      searchError: null,
    }));
  };

  return {
    searchResults: state.searchResults,
    isLoading: state.isLoading,
    searchError: state.searchError,
    hasSearched: state.hasSearched,
    searchFlights,
    clearSearch,
    clearError,
  };
};
