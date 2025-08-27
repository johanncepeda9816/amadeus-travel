import { Box, Typography, Button, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import { FlightTable, FlightModal } from './components';
import { useAdminFlights } from '@/hooks';
import type { AdminFlight } from '@/types/flights';

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<AdminFlight | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { deleteFlight } = useAdminFlights();

  const handleCreateClick = () => {
    setEditingFlight(null);
    setIsModalOpen(true);
  };

  const handleEditFlight = (flight: AdminFlight) => {
    setEditingFlight(flight);
    setIsModalOpen(true);
  };

  const handleDeleteFlight = async (flight: AdminFlight) => {
    if (
      window.confirm(
        `Are you sure you want to delete flight ${flight.flightNumber}?`
      )
    ) {
      const success = await deleteFlight(flight.id);
      if (success) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFlight(null);
  };

  const handleModalSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    handleCloseModal();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" component="h1">
          Flight Management Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          size="large"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Create New Flight
        </Button>
      </Stack>

      <FlightTable
        onEdit={handleEditFlight}
        onDelete={handleDeleteFlight}
        refreshTrigger={refreshTrigger}
      />

      <FlightModal
        open={isModalOpen}
        onClose={handleCloseModal}
        flight={editingFlight}
        onSuccess={handleModalSuccess}
      />
    </Box>
  );
};
