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
  },
});
