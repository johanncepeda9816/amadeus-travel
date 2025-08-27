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
    valueFormatter: (params: string) => {
      if (!params) return 'No value';

      const date = new Date(params);

      if (isNaN(date.getTime())) return `Invalid: ${params}`;

      return (
        date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) +
        ' ' +
        date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    },
  },
  {
    field: 'arrivalTime',
    headerName: 'Arrival',
    width: 180,
    valueFormatter: (params: string) => {
      if (!params) return 'No value';

      const date = new Date(params);

      if (isNaN(date.getTime())) return `Invalid: ${params}`;

      return (
        date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) +
        ' ' +
        date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    },
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
    valueFormatter: (params: number) => {
      if (params == null || params === undefined) return 'No price';
      return `$${params.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    },
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
