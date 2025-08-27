import { notifications } from '@/lib';
import { adminFlightService } from '@/services';
import type { FlightSearchParams } from '@/services/adminFlightService';
import type {
  AdminFlight,
  AdminFlightsResponse,
  CreateFlightRequest,
  UpdateFlightRequest,
} from '@/types/flights';
import { useCallback, useState } from 'react';

interface UseAdminFlightsState {
  flights: AdminFlight[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
}

export const useAdminFlights = () => {
  const [state, setState] = useState<UseAdminFlightsState>({
    flights: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 20,
    searchTerm: '',
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
  });

  const fetchFlights = useCallback(async (params?: FlightSearchParams) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response: AdminFlightsResponse =
        await adminFlightService.searchFlights(params);

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch flights');
      }

      setState((prev) => ({
        ...prev,
        flights: response.data.content,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        currentPage: response.data.pageable.pageNumber,
        pageSize: response.data.pageable.pageSize,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch flights';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      notifications.error(errorMessage);
    }
  }, []);

  const createFlight = async (
    flightData: CreateFlightRequest
  ): Promise<AdminFlight | null> => {
    setState((prev) => ({ ...prev, isCreating: true, error: null }));

    try {
      const response = await adminFlightService.createFlight(flightData);

      if (!response.success) {
        throw new Error(response.error || 'Failed to create flight');
      }

      setState((prev) => ({ ...prev, isCreating: false }));
      notifications.success('Flight created successfully');

      await fetchFlights({
        page: state.currentPage,
        size: state.pageSize,
        searchTerm: state.searchTerm || undefined,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create flight';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isCreating: false,
      }));
      notifications.error(errorMessage);
      return null;
    }
  };

  const updateFlight = async (
    id: number,
    flightData: UpdateFlightRequest
  ): Promise<AdminFlight | null> => {
    setState((prev) => ({ ...prev, isUpdating: true, error: null }));

    try {
      const response = await adminFlightService.updateFlight(id, flightData);

      if (!response.success) {
        throw new Error(response.error || 'Failed to update flight');
      }

      setState((prev) => ({ ...prev, isUpdating: false }));
      notifications.success('Flight updated successfully');

      await fetchFlights({
        page: state.currentPage,
        size: state.pageSize,
        searchTerm: state.searchTerm || undefined,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update flight';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isUpdating: false,
      }));
      notifications.error(errorMessage);
      return null;
    }
  };

  const deleteFlight = async (id: number): Promise<boolean> => {
    setState((prev) => ({ ...prev, isDeleting: true, error: null }));

    try {
      const response = await adminFlightService.deleteFlight(id);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete flight');
      }

      setState((prev) => ({ ...prev, isDeleting: false }));
      notifications.success('Flight deleted successfully');

      await fetchFlights({
        page: state.currentPage,
        size: state.pageSize,
        searchTerm: state.searchTerm || undefined,
      });

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete flight';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isDeleting: false,
      }));
      notifications.error(errorMessage);
      return false;
    }
  };

  const getFlightById = async (id: number): Promise<AdminFlight | null> => {
    try {
      const response = await adminFlightService.getFlightById(id);

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch flight');
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch flight';
      notifications.error(errorMessage);
      return null;
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const refreshFlights = () => {
    fetchFlights({
      page: state.currentPage,
      size: state.pageSize,
      searchTerm: state.searchTerm || undefined,
    });
  };

  const searchFlights = useCallback(
    (searchTerm: string) => {
      setState((prev) => ({ ...prev, searchTerm, currentPage: 0 }));
      fetchFlights({
        page: 0,
        size: state.pageSize,
        searchTerm: searchTerm || undefined,
      });
    },
    [fetchFlights, state.pageSize]
  );

  const clearSearch = useCallback(() => {
    setState((prev) => ({ ...prev, searchTerm: '', currentPage: 0 }));
    fetchFlights({ page: 0, size: state.pageSize });
  }, [fetchFlights, state.pageSize]);

  return {
    flights: state.flights,
    totalElements: state.totalElements,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    isLoading: state.isLoading,
    isCreating: state.isCreating,
    isUpdating: state.isUpdating,
    isDeleting: state.isDeleting,
    error: state.error,
    fetchFlights,
    searchFlights,
    clearSearch,
    createFlight,
    updateFlight,
    deleteFlight,
    getFlightById,
    clearError,
    refreshFlights,
  };
};
