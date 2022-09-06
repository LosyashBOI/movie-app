import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App, MainPage } from './components/App';
import { MovieCardDescr } from './components/movie-card-descr';
import { Search } from './components/search/search';
import { store } from './store';

ReactDOM.render(
    <Provider store={store}>
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
    </Provider>,
    document.getElementById('root'),
);
