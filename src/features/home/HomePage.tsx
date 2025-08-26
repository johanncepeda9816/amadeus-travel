import { Box } from '@mui/material';
import { HeroSection } from './components/HeroSection';
import { SearchSection } from './components/SearchSection';

export const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <SearchSection />
    </Box>
  );
};
