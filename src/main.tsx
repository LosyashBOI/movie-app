import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App, MainPage } from './components/App';
import { MovieCardDescr } from './components/movie-card-descr';
import { Search } from './components/search/search';
import { store } from './store';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        s: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
    }
}

let theme = createTheme({
    breakpoints: {
        values: {
            xs: 320,
            s: 600,
            sm: 960,
            md: 1140,
            lg: 1600,
            xl: 1920,
        },
    },
    components: {
        MuiPagination: {
            styleOverrides: {
                ul: {
                    justifyContent: 'space-between',
                },
            },
        },
    },
});
// theme = responsiveFontSizes(theme);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="movie-app" element={<App />}>
                        <Route index element={<MainPage />} />
                        <Route path="film">
                            <Route path={':filmId'} element={<MovieCardDescr />} />
                        </Route>
                        <Route path="search" element={<Search />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
