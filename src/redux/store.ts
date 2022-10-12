import { createStore } from 'redux';

import { getStorageData, STORAGE } from '../utils';
import { movieApp } from './reducers';

const { IS_LOGGED_IN, FAVORITES, WATCH_LATER } = STORAGE;

const storage = {
    isLoggedIn: getStorageData(IS_LOGGED_IN) ?? false,
    favorites: getStorageData(FAVORITES) ?? [],
    watchLaterList: getStorageData(WATCH_LATER) ?? [],
};

export const store = createStore(movieApp, storage);
