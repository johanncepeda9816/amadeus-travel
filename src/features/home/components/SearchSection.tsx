import { FlightSearchForm } from '@/features';
import {
  FlightTakeoff as FlightIcon,
  Hotel as HotelIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const SearchSection = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6, mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          transform: 'translateY(-50px)',
          bgcolor: 'background.paper',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
            },
          }}
        >
          <Tab
            icon={<FlightIcon />}
            label="Flights"
            iconPosition="start"
            sx={{ gap: 1 }}
          />
          <Tab
            icon={<HotelIcon />}
            label="Hotels"
            iconPosition="start"
            sx={{ gap: 1 }}
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <FlightSearchForm />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Hotel Search
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Search functionality coming soon...
            </Typography>
            <Button variant="outlined" disabled>
              Search Hotels
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};
