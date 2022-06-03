import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: '"Press Start 2P", cursive',
    h1: {
      textAlign: 'center'
    },
    h2: {
      textAlign: 'center'
    },
    h3: {
      textAlign: 'center'
    },
    h4: {
      textAlign: 'center'
    },
    h5: {
      textAlign: 'center'
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: '#000',
            backgroundColor: 'white'
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: 'red',
            backgroundColor: '#000'
          },
        },
      ]
    },
  },
});
