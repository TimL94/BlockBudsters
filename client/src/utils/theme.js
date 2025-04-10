import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'black', // ← default color for all dividers
        },
      },
    },
  },
});

export default theme;