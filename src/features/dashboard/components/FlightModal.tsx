import { Dialog, DialogContent } from '@mui/material';
import { FlightForm } from './FlightForm';
import { useAdminFlights } from '@/hooks';
import type { AdminFlight } from '@/types/flights';
import type { FlightFormData } from '../schemas';

interface FlightModalProps {
  open: boolean;
  onClose: () => void;
  flight?: AdminFlight | null;
  onSuccess?: () => void;
}

export const FlightModal = ({
  open,
  onClose,
  flight,
  onSuccess,
}: FlightModalProps) => {
  const { createFlight, updateFlight, isCreating, isUpdating, error } =
    useAdminFlights();

  const handleSubmit = async (values: FlightFormData) => {
    try {
      const flightData = {
        ...values,
        departureTime: values.departureTime.toISOString(),
        arrivalTime: values.arrivalTime.toISOString(),
      };

      if (flight) {
        await updateFlight(flight.id, flightData);
      } else {
        await createFlight(flightData);
      }
      onSuccess?.();
      onClose();
    } catch {
      console.error('Error submitting flight:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <FlightForm
          flight={flight || undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isCreating || isUpdating}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};
