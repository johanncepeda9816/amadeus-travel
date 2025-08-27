import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import type { AdminFlight } from '@/types/flights';
import { useAdminFlights } from '@/hooks';
import { LoadingSpinner } from '@/components';
import { columns } from '../constants/flights-columns';
import { useEffect } from 'react';

interface FlightTableProps {
  onEdit: (flight: AdminFlight) => void;
  onDelete: (flight: AdminFlight) => void;
}

export const FlightTable = ({ onEdit, onDelete }: FlightTableProps) => {
  const {
    flights,
    isLoading,
    currentPage,
    pageSize,
    totalElements,
    fetchFlights,
  } = useAdminFlights();

  useEffect(() => {
    fetchFlights({ page: 0, size: 20 });
  }, [fetchFlights]);

  if (isLoading && flights.length === 0) {
    return <LoadingSpinner message="Loading flights..." />;
  }

  return (
    <Box>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={flights}
          columns={columns(onEdit, onDelete)}
          pagination
          paginationMode="server"
          rowCount={totalElements}
          paginationModel={{ page: currentPage, pageSize }}
          onPaginationModelChange={(model) => {
            fetchFlights({ page: model.page, size: model.pageSize });
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          loading={isLoading}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8f9fa',
              fontWeight: 'bold',
            },
          }}
        />
      </Box>
    </Box>
  );
};
