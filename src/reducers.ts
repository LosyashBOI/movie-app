import { combineReducers } from 'redux';

import {
    ADD_FAVORITE,
    ADD_WATCH_LATER,
    OPEN_AUTHORIZATION,
    REMOVE_FAVORITE,
    REMOVE_WATCH_LATER,
    SET_GENRES,
    SET_LOGGED_IN,
    SET_PAGE,
    SET_SORT,
    SET_SORT_USER,
    SET_YEAR,
    SORT_BY_FAME_DOWN,
} from './actions';
import {
    actionFavorites,
    actionGenreList,
    actionIsAuthorization,
    actionIsLoggedIn,
    actionPage,
    actionSort,
    actionSortUser,
    actionWatchLater,
    actionYear,
} from './interfaces';

function currentPage(state = 1, action: actionPage) {
    switch (action.type) {
        case SET_PAGE:
            return action.page;
        default:
            return state;
    }
}

function releaseDate(state = 2020, action: actionYear) {
    switch (action.type) {
        case SET_YEAR:
            return action.year;
        default:
            return state;
    }
}

function sortType(state = SORT_BY_FAME_DOWN, action: actionSort) {
    switch (action.type) {
        case SET_SORT:
            return action.sort;
        default:
            return state;
    }
}

function sortUserType(state = '', action: actionSortUser) {
    switch (action.type) {
        case SET_SORT_USER:
            return action.sortUser;
        default:
            return state;
    }
}

function genreList(state = [], action: actionGenreList) {
    switch (action.type) {
        case SET_GENRES:
            return action.genreList;
        default:
            return state;
    }
}

function isLoggedIn(state = false, action: actionIsLoggedIn) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return action.isLoggedIn;
        default:
            return state;
    }
}

function isAuthorizationOpened(state = false, action: actionIsAuthorization) {
    switch (action.type) {
        case OPEN_AUTHORIZATION:
            return action.isAuthorization;
        default:
            return state;
    }
}

function favorites(state = [], action: actionFavorites) {
    switch (action.type) {
        case ADD_FAVORITE:
            return [...state, action.favoriteId];
        case REMOVE_FAVORITE:
            return [...state].filter((item) => item !== action.favoriteId);
        default:
            return state;
    }
}

function watchLaterList(state = [], action: actionWatchLater) {
    switch (action.type) {
        case ADD_WATCH_LATER:
            return [...state, action.watchLaterId];
        case REMOVE_WATCH_LATER:
            return [...state].filter((item) => item !== action.watchLaterId);
        default:
            return state;
    }
}

export const movieApp = combineReducers({
    currentPage,
    releaseDate,
    sortType,
    sortUserType,
    genreList,
    isLoggedIn,
    isAuthorizationOpened,
    favorites,
    watchLaterList,
});
