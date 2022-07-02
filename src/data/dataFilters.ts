import { getYear } from 'date-fns';

import {
    SORT_BY_FAME_DOWN,
    SORT_BY_FAME_UP,
    SORT_BY_RATE_DOWN,
    SORT_BY_RATE_UP,
} from '../actions';
import { SORT_FAVORITES, SORT_WATCH_LATER } from '../components/FilterSelect';
import { iStore } from '../interfaces';
import { filmsList } from './filmsList';

function compare(field: string) {
    return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
}

function sortedList({ sortType }: iStore) {
    const defaultSort = [...filmsList].sort(compare('popularity')).reverse();

    switch (sortType) {
        case SORT_BY_FAME_UP:
            return [...filmsList].sort(compare('popularity'));
        case SORT_BY_FAME_DOWN:
            return [...filmsList].sort(compare('popularity')).reverse();
        case SORT_BY_RATE_UP:
            return [...filmsList].sort(compare('vote_average'));
        case SORT_BY_RATE_DOWN:
            return [...filmsList].sort(compare('vote_average')).reverse();
        default:
            return defaultSort;
    }
}

function filterByDate(state: iStore) {
    const releaseDate = state.releaseDate;
    const films = sortedList(state);

    return films.filter((item) => {
        const year = getYear(new Date(item.release_date));

        if (releaseDate === year) return item;
    });
}

function filterByGenre(state: iStore) {
    const genres = state.genreList;
    // console.log(genres);
    const films = filterByDate(state);

    if (genres.length === 0) return films;

    return films.filter((item) => {
        if (genres.every((id) => item.genre_ids.includes(id))) return item;
    });
}

export function filterByUserList(state: iStore) {
    const { watchLaterList, favorites, sortUserType, isLoggedIn } = state;
    const films = filterByGenre(state);

    if (!isLoggedIn) return films;

    switch (sortUserType) {
        case SORT_FAVORITES:
            return films.filter((item) => favorites.includes(item.id));
        case SORT_WATCH_LATER:
            return films.filter((item) => watchLaterList.includes(item.id));
        default:
            return films;
    }
}
