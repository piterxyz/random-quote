function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function addToLocalStorage(key, value) {
    const data = getLocalStorage(key);

    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
}

function removeFromLocalStorage(key, value) {
    const data = getLocalStorage(key);

    data.splice(data.indexOf(value), 1);
    localStorage.setItem(key, JSON.stringify(data));
}

export {
    getLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage
}