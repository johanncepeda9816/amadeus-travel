import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { NavHeader } from './NavHeader';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
      }}
    >
      <NavHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
