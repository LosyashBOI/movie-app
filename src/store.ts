import { createStore } from 'redux';

import { movieApp } from './reducers';
import { getStorageData, STORAGE } from './utils';

const { IS_LOGGED_IN, FAVORITES, WATCH_LATER } = STORAGE;

const storage = {
    isLoggedIn: getStorageData(IS_LOGGED_IN) ?? false,
    favorites: getStorageData(FAVORITES) ?? [],
    watchLaterList: getStorageData(WATCH_LATER) ?? [],
};

export const store = createStore(movieApp, storage);
