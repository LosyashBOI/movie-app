export const SET_PAGE = 'SET_PAGE';
export const SET_GENRES = 'SET_GENRES';
export const SET_YEAR = 'SET_YEAR';
export const SET_SORT = 'SET_SORT';
export const SET_SORT_USER = 'SET_SORT_USER';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const OPEN_AUTHORIZATION = 'OPEN_AUTHORIZATION';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const ADD_WATCH_LATER = 'ADD_WATCH_LATER';
export const REMOVE_WATCH_LATER = 'REMOVE_WATCH_LATER';

export const SORT_BY_FAME_DOWN = 'SORT_BY_FAME_DOWN';
export const SORT_BY_FAME_UP = 'SORT_BY_FAME_UP';
export const SORT_BY_RATE_DOWN = 'SORT_BY_RATE_DOWN';
export const SORT_BY_RATE_UP = 'SORT_BY_RATE_UP';

export function setPage(page: number) {
    return { type: SET_PAGE, page };
}

export function setYear(year: number) {
    return { type: SET_YEAR, year };
}

export function setSort(sort: string) {
    return { type: SET_SORT, sort };
}

export function setSortUser(sortUser: string) {
    return { type: SET_SORT_USER, sortUser };
}

export function setGenres(genreList: Array<number>) {
    return { type: SET_GENRES, genreList };
}

export function setLoggedIn(isLoggedIn: boolean) {
    return { type: SET_LOGGED_IN, isLoggedIn };
}

export function openAuthorization(isAuthorization: boolean) {
    return { type: OPEN_AUTHORIZATION, isAuthorization };
}

export function addFavorite(favoriteId: number) {
    return { type: ADD_FAVORITE, favoriteId };
}

export function removeFavorite(favoriteId: number) {
    return { type: REMOVE_FAVORITE, favoriteId };
}

export function addWatchLater(watchLaterId: number) {
    return { type: ADD_WATCH_LATER, watchLaterId };
}

export function removeWatchLater(watchLaterId: number) {
    return { type: REMOVE_WATCH_LATER, watchLaterId };
}
