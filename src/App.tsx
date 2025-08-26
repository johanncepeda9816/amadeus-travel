import { theme } from '@/lib';
import { AppRouter } from '@/router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
