import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from 'formik';
import type { SyntheticEvent } from 'react';
import type { Location } from '@/types/flights';

interface LocationAutocompleteProps {
  name: string;
  label: string;
  placeholder?: string;
  locations: Location[];
  isLoading?: boolean;
  useFormik?: boolean;
}

export const LocationAutocomplete = ({
  name,
  label,
  placeholder,
  locations,
  isLoading = false,
  useFormik = true,
}: LocationAutocompleteProps) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && !!meta.error;

  const handleChange = (_: SyntheticEvent, newValue: Location | null) => {
    helpers.setValue(newValue?.code || '');
  };

  const selectedLocation = locations.find(
    (location) => location.code === field.value
  );

  if (!useFormik) {
    return (
      <Autocomplete
        options={locations}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }

  return (
    <Autocomplete
      options={locations}
      getOptionLabel={(option) => option.name}
      value={selectedLocation || null}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          error={hasError}
          helperText={hasError ? meta.error : undefined}
          onBlur={field.onBlur}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.code}>
          <div>
            <div style={{ fontWeight: 500 }}>{option.name}</div>
          </div>
        </li>
      )}
      noOptionsText="No locations found"
      loading={isLoading}
    />
  );
};
