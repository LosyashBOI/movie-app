interface movieCard {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface iStore {
    currentPage: number;
    releaseDate: number;
    sortType: string;
    sortUserType: string;
    genreList: Array<number>;
    isLoggedIn: boolean;
    isAuthorizationOpened: boolean;
    favorites: Array<number>;
    watchLaterList: Array<number>;
}

interface genre {
    id: number;
    name: string;
}

interface actionPage {
    type: string;
    page: number;
}

interface actionYear {
    type: string;
    year: number;
}

interface actionSort {
    type: string;
    sort: string;
}

interface actionSortUser {
    type: string;
    sortUser: string;
}

interface actionGenreList {
    type: string;
    genreList: Array<number>;
}

interface actionIsLoggedIn {
    type: string;
    isLoggedIn: boolean;
}

interface actionIsAuthorization {
    type: string;
    isAuthorization: boolean;
}

interface actionFavorites {
    type: string;
    favoriteId: number;
}

interface actionWatchLater {
    type: string;
    watchLaterId: number;
}

export type {
    actionFavorites,
    actionGenreList,
    actionIsAuthorization,
    actionIsLoggedIn,
    actionPage,
    actionSort,
    actionSortUser,
    actionWatchLater,
    actionYear,
    genre,
    iStore,
    movieCard,
};
