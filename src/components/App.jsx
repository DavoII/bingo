import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../uitls';
import { Header } from './Header';
import { Board } from './Bingo';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Board />
    </ThemeProvider>
  );
};
