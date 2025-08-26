import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';

interface BaseInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  name: string;
}

export const BaseInput = ({ name, ...props }: BaseInputProps) => {
  return <TextField {...props} name={name} fullWidth variant="outlined" />;
};
