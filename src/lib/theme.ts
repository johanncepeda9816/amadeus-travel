import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
        },
        body: {
          width: '100%',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
        '#root': {
          width: '100%',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1.1rem',
        },
        contained: {
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
            boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.4)',
          },
          '&:active': {
            background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)',
          },
        },
        outlined: {
          borderColor: '#1976d2',
          color: '#1976d2',
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#1565c0',
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
            color: '#1565c0',
            borderWidth: '2px',
          },
          '&:active': {
            borderColor: '#0d47a1',
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            color: '#0d47a1',
          },
          '&:focus': {
            outline: 'none',
            borderColor: '#1976d2',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});
