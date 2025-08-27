import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Box, Chip, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { AdminFlight } from '@/types/flights';
import { useAdminFlights } from '@/hooks';
import { LoadingSpinner } from '@/components';

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

  const columns: GridColDef[] = [
    {
      field: 'flightNumber',
      headerName: 'Flight Number',
      width: 130,
    },
    {
      field: 'airline',
      headerName: 'Airline',
      width: 150,
    },
    {
      field: 'origin',
      headerName: 'Origin',
      width: 120,
    },
    {
      field: 'destination',
      headerName: 'Destination',
      width: 120,
    },
    {
      field: 'departureTime',
      headerName: 'Departure',
      width: 180,
      valueFormatter: (params: { value: string }) => {
        return new Date(params.value).toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
      },
    },
    {
      field: 'arrivalTime',
      headerName: 'Arrival',
      width: 180,
      valueFormatter: (params: { value: string }) => {
        return new Date(params.value).toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params: { value: number }) => `$${params.value}`,
    },
    {
      field: 'availableSeats',
      headerName: 'Seats',
      width: 80,
      align: 'center',
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params: GridRowParams<AdminFlight>) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => onEdit(params.row)}
          color="primary"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon sx={{ color: 'error.main' }} />}
          label="Delete"
          onClick={() => onDelete(params.row)}
        />,
      ],
    },
  ];

  if (isLoading && flights.length === 0) {
    return <LoadingSpinner message="Loading flights..." />;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Flight Management
      </Typography>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={flights}
          columns={columns}
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
