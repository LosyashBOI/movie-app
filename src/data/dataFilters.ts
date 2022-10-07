import { getYear } from 'date-fns';

import {
    SORT_BY_FAME_DOWN,
    SORT_BY_FAME_UP,
    SORT_BY_RATE_DOWN,
    SORT_BY_RATE_UP,
} from '../redux/actions';
import { SORT_FAVORITES, SORT_WATCH_LATER } from '../components/filter/FilterSelect';
import { iStore, searchFilters } from '../interfaces';
import { filmsList } from './filmsList';

// const POPULARITY = 'popularity';
// const VOTE_AVERAGE = 'vote_average';
//
// function compare(field: keyof movieCard) {
//     return (a: movieCard, b: movieCard) => (a[field] > b[field] ? 1 : -1);
// }

function sortedList({ sortType }: iStore) {
    switch (sortType) {
        case SORT_BY_FAME_UP:
            return [...filmsList].sort((a, b) => a.popularity - b.popularity);
        case SORT_BY_FAME_DOWN:
            return [...filmsList].sort((a, b) => b.popularity - a.popularity);
        case SORT_BY_RATE_UP:
            return [...filmsList].sort((a, b) => a.vote_average - b.vote_average);
        case SORT_BY_RATE_DOWN:
            return [...filmsList].sort((a, b) => b.vote_average - a.vote_average);
        default:
            return filmsList;
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

export function filterBySearch({ genre, popularity, rating }: searchFilters) {
    const filteredByGenre = filmsList.filter((item) =>
        item.genre_ids.includes(genre as number),
    );

    const filteredByRating = filteredByGenre.filter((item) => {
        const highRating = item.vote_average >= 5;

        return rating === 'high' ? highRating : !highRating;
    });

    return filteredByRating.filter((item) => {
        const popular = item.popularity > 100 && item.vote_count > 200;

        return popularity === 'popular' ? popular : !popular;
    });
}
