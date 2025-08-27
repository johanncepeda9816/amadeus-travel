import { type GridColDef, type GridRowParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { AdminFlight } from '@/types/flights';

export const columns = (
  onEdit: (flight: AdminFlight) => void,
  onDelete: (flight: AdminFlight) => void
): GridColDef[] => [
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
