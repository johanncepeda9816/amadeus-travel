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
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'airline',
    headerName: 'Airline',
    flex: 1.2,
    minWidth: 130,
  },
  {
    field: 'origin',
    headerName: 'Origin',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'destination',
    headerName: 'Destination',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'departureTime',
    headerName: 'Departure',
    flex: 1.5,
    minWidth: 160,
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
    flex: 1.5,
    minWidth: 160,
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
    flex: 0.8,
    minWidth: 100,
    valueFormatter: (params: number) => {
      if (params == null || params === undefined) return 'No price';
      return `$${params.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    },
  },
  {
    field: 'availableSeats',
    headerName: 'Seats',
    flex: 0.6,
    minWidth: 70,
    align: 'center',
  },
  {
    field: 'active',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 90,
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
    flex: 0.8,
    minWidth: 100,
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
