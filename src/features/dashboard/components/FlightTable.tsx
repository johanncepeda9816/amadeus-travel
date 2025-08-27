import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import type { AdminFlight } from '@/types/flights';
import { useAdminFlights } from '@/hooks';
import { LoadingSpinner } from '@/components';
import { columns } from '../constants/flights-columns';
import { useEffect, useState, useCallback, useMemo } from 'react';

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
    searchTerm,
    fetchFlights,
    searchFlights,
    clearSearch,
  } = useAdminFlights();

  const [inputValue, setInputValue] = useState('');

  const debouncedSearchFlights = useMemo(() => {
    const timeoutId = { current: null as number | null };

    return (searchTerm: string) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        searchFlights(searchTerm);
      }, 500);
    };
  }, [searchFlights]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setInputValue(value);
      if (value.trim()) {
        debouncedSearchFlights(value.trim());
      } else {
        clearSearch();
      }
    },
    [debouncedSearchFlights, clearSearch]
  );

  const handleClearSearch = useCallback(() => {
    setInputValue('');
    clearSearch();
  }, [clearSearch]);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    fetchFlights({ page: 0, size: 20 });
  }, [fetchFlights]);

  if (isLoading && flights.length === 0) {
    return <LoadingSpinner message="Loading flights..." />;
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search flights by flight number, airline, origin, destination, aircraft type, or cabin class..."
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            },
          }}
        />
      </Box>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={flights}
          columns={columns(onEdit, onDelete)}
          pagination
          paginationMode="server"
          rowCount={totalElements}
          paginationModel={{ page: currentPage, pageSize }}
          onPaginationModelChange={(model) => {
            fetchFlights({
              page: model.page,
              size: model.pageSize,
              searchTerm: searchTerm || undefined,
            });
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
