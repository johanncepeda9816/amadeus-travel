import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { useField } from 'formik';

interface FormikInputProps extends Omit<TextFieldProps, 'error'> {
  name: string;
}

export const FormikInput = ({ name, ...props }: FormikInputProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <TextField
      {...field}
      {...props}
      error={hasError}
      helperText={hasError ? meta.error : props.helperText}
      fullWidth
      variant="outlined"
    />
  );
};
