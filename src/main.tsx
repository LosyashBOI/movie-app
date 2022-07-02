import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App, MainPage } from './components/App';
import { store } from './store';
import { MovieCardDescr } from './components/movie-card-descr';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/movie-app" element={<App />}>
                    <Route index element={<MainPage />} />
                    <Route path="/movie-app/film/">
                        <Route path={':filmId'} element={<MovieCardDescr />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
