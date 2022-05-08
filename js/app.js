const quoteAuthor = document.querySelector('#quote-author');
const quoteText = document.querySelector('#quote-text');
const quoteId = document.querySelector('#quote-id');
const quoteButton = document.querySelector('#new-quote');

const favoriteButton = document.querySelector('#favorite');
const favoritesNav = document.querySelector('#favorites-nav')
const favoriteIcon = document.querySelector('#favorite-icon');

window.addEventListener('DOMContentLoaded', DOMContentLoaded);
quoteButton.addEventListener('click', generateQuote)
favoriteButton.addEventListener('click', toggleFavorites);

function DOMContentLoaded() {
    generateQuote();
    updateNavbar();
}

function updateNavbar() {
    const favorites = getLocalStorage('favorites');

    favoritesNav.innerHTML = `Favorites (${favorites.length})`;
}

async function generateQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();

    quoteAuthor.innerHTML = data.author;
    quoteText.innerHTML = data.content;
    quoteId.innerHTML = data._id;

    changeFavoriteIcon();
}

function toggleFavorites() {
    const favorites = getLocalStorage('favorites');

    if(favorites.includes(quoteId.innerHTML)) removeFromLocalStorage('favorites', quoteId.innerHTML);
    else addToLocalStorage('favorites', quoteId.innerHTML);
    updateNavbar();
    changeFavoriteIcon();
}

function changeFavoriteIcon() {
    const favorites = getLocalStorage('favorites');
    
    if(favorites.includes(quoteId.innerHTML)) favoriteButton.classList.add('active')
    else favoriteButton.classList.remove('active')
}

// localStorage
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