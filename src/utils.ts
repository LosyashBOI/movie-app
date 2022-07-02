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

export { getStorageData, setStorageData, STORAGE };
