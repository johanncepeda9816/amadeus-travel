import { flightService } from '@/services';
import type { UpcomingFlightsResponse } from '@/types/flights';
import { useEffect, useState } from 'react';

export const useUpcomingFlights = () => {
  const [upcomingFlights, setUpcomingFlights] = useState<
    UpcomingFlightsResponse['data']
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUpcomingFlights();
  }, []);

  const fetchUpcomingFlights = async () => {
    try {
      setIsLoading(true);
      const response = await flightService.getUpcomingFlights();
      setUpcomingFlights(response.data);
    } catch (error) {
      console.error('Error fetching upcoming flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { upcomingFlights, isLoading };
};
