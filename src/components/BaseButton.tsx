import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import type { ReactNode } from 'react';

interface BaseButtonProps extends Omit<ButtonProps, 'children'> {
  children: ReactNode;
  loading?: boolean;
}

export const BaseButton = ({
  children,
  loading = false,
  disabled,
  ...props
}: BaseButtonProps) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        ...props.sx,
      }}
    >
      {loading ? 'Loading...' : children}
    </Button>
  );
};
