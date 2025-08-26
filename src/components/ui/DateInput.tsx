import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useField } from 'formik';

interface DateInputProps {
  name: string;
  label: string;
  useFormik?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export const DateInput = ({
  name,
  label,
  useFormik = true,
  minDate,
  maxDate,
  disabled = false,
}: DateInputProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  if (!useFormik) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              name,
            },
          }}
        />
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={field.value || null}
        onChange={(date) => {
          field.onChange({ target: { name, value: date } });
        }}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            name,
            error: hasError,
            helperText: hasError ? meta.error : undefined,
          },
        }}
      />
    </LocalizationProvider>
  );
};
