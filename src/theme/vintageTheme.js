import { createTheme } from '@mui/material/styles';

export const vintageTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1b3b2b', // Deep botanical forest green
      dark: '#032517',
      light: '#456553',
      contrastText: '#fcf9f4',
    },
    secondary: {
      main: '#c29b38', // Antique brass / gold
      dark: '#775a00',
      light: '#fed269',
      contrastText: '#1c1c19',
    },
    background: {
      default: '#fcf9f4', // Warm parchment
      paper: '#ffffff',
    },
    text: {
      primary: '#1c1c19', // Charcoal ink
      secondary: '#424843',
    },
    divider: 'rgba(3, 37, 23, 0.15)',
    action: {
      hover: 'rgba(27, 59, 43, 0.04)',
      selected: 'rgba(27, 59, 43, 0.08)',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 600 },
    h2: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 600 },
    h3: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 600 },
    h4: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 600 },
    h5: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 600 },
    h6: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 600 },
    subtitle1: { fontFamily: "'Inter', sans-serif", fontWeight: 500 },
    subtitle2: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '0.05em' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1b3b2b',
          color: '#fcf9f4',
          boxShadow: '0 2px 8px rgba(3, 37, 23, 0.15)',
          borderBottom: '1px solid rgba(194, 155, 56, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: '1px solid rgba(3, 37, 23, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(3, 37, 23, 0.15)',
          borderRadius: 4,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#1b3b2b',
          '&:hover': {
            backgroundColor: '#032517',
          },
        },
        outlinedPrimary: {
          borderColor: '#1b3b2b',
          color: '#1b3b2b',
          '&:hover': {
            backgroundColor: 'rgba(27, 59, 43, 0.05)',
            borderColor: '#032517',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#f6f3ee',
          color: '#1c1c19',
          borderBottom: '2px solid rgba(3, 37, 23, 0.2)',
          letterSpacing: '0.03em',
        },
        root: {
          borderBottom: '1px solid rgba(3, 37, 23, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 3,
        },
      },
    },
  },
});
