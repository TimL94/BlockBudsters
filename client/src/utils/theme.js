import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'white', // ← default color for all dividers
        },
      },
    },
  },
});

export default theme;