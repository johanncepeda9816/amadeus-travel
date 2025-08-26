import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import type { ReactNode } from 'react';

interface SelectInputProps extends Omit<TextFieldProps, 'error' | 'select'> {
  name: string;
  useFormik?: boolean;
  children: ReactNode;
}

export const SelectInput = ({
  name,
  useFormik = true,
  children,
  ...props
}: SelectInputProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  if (!useFormik) {
    return (
      <TextField {...props} name={name} select fullWidth variant="outlined">
        {children}
      </TextField>
    );
  }

  return (
    <TextField
      {...field}
      {...props}
      select
      error={hasError}
      helperText={hasError ? meta.error : props.helperText}
      fullWidth
      variant="outlined"
    >
      {children}
    </TextField>
  );
};
