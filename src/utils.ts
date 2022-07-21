import genreList from './data/genreList';
import { genre } from './interfaces';

const STORAGE = {
    IS_LOGGED_IN: 'isLoggedIn',
    FAVORITES: 'favorites',
    WATCH_LATER: 'watchLater',
};

function getStorageData(storage: string) {
    const jsonData = localStorage.getItem(storage) as string;

    try {
        return JSON.parse(jsonData);
    } catch (e) {
        console.log(e);
    }
}

function setStorageData(storage: string, data: any) {
    const jsonData = JSON.stringify(data);

    localStorage.setItem(storage, jsonData);
}

function getGenres(genres: Array<number>) {
    const filmsGenres = genres.map((id) => {
        const { name } = genreList.find((item: genre) => item.id === id) as genre;
        return name;
    });

    return filmsGenres.join(', ');
}

export { getGenres, getStorageData, setStorageData, STORAGE };
