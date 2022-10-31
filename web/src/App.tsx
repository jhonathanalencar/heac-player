import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';

import { Router } from './Router';

import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/defaultTheme";
import { store } from './redux/store';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}
