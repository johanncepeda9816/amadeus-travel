import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FlightSearchFormData } from '../schemas';
import type { FlightSearchResponse } from '@/services';
import { flightService } from '@/services';
import { notifications } from '@/lib';

interface FlightSearchState {
  searchResults: FlightSearchResponse['data'] | null;
  isLoading: boolean;
  searchError: string | null;
  hasSearched: boolean;
  lastSearchData: FlightSearchFormData | null;
}

interface FlightSearchActions {
  searchFlights: (
    searchData: FlightSearchFormData
  ) => Promise<FlightSearchResponse['data']>;
  clearSearch: () => void;
  clearError: () => void;
}

type FlightSearchStore = FlightSearchState & FlightSearchActions;

export const useFlightSearchStore = create<FlightSearchStore>()(
  persist(
    (set) => ({
      searchResults: null,
      isLoading: false,
      searchError: null,
      hasSearched: false,
      lastSearchData: null,

      searchFlights: async (searchData: FlightSearchFormData) => {
        set({ isLoading: true, searchError: null });

        try {
          const response = await flightService.searchFlights(searchData);

          if (!response.success) {
            throw new Error(response.error || 'Search failed');
          }

          const results = response.data;

          set({
            searchResults: results,
            isLoading: false,
            hasSearched: true,
            searchError: null,
            lastSearchData: searchData,
          });

          const totalFlights =
            results.outboundFlights.length + results.returnFlights.length;
          notifications.success(
            response.message ||
              `Found ${totalFlights} flights for your search from ${searchData.origin} to ${searchData.destination}`
          );

          return results;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Failed to search flights. Please try again.';

          set({
            searchError: errorMessage,
            isLoading: false,
            hasSearched: true,
          });

          notifications.error(errorMessage);
          throw error;
        }
      },

      clearSearch: () => {
        set({
          searchResults: null,
          isLoading: false,
          searchError: null,
          hasSearched: false,
          lastSearchData: null,
        });
      },

      clearError: () => {
        set({ searchError: null });
      },
    }),
    {
      name: 'flight-search-storage',
      partialize: (state) => ({
        searchResults: state.searchResults,
        hasSearched: state.hasSearched,
        lastSearchData: state.lastSearchData,
      }),
      storage: {
        getItem: (name: string) => {
          const value = localStorage.getItem(name);
          if (!value) return null;

          try {
            const parsed = JSON.parse(value);

            if (parsed.state?.lastSearchData) {
              const searchData = parsed.state.lastSearchData;
              if (searchData.departureDate) {
                searchData.departureDate = new Date(searchData.departureDate);
              }
              if (searchData.returnDate) {
                searchData.returnDate = new Date(searchData.returnDate);
              }
            }

            return parsed;
          } catch {
            return null;
          }
        },
        setItem: (name: string, value: unknown) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
