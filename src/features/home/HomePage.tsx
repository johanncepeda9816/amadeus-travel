import { Box } from '@mui/material';
import {
  HeroSection,
  SearchSection,
  UpcomingFlightsSection,
} from './components';

export const HomePage = () => {
  return (
    <Box sx={{ pb: 10 }}>
      <HeroSection />
      <SearchSection />
      <UpcomingFlightsSection />
    </Box>
  );
};
