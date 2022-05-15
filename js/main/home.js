import { updateNavbar } from './navbar.js';
import { getLocalStorage, addToLocalStorage, removeFromLocalStorage } from '../util/localStorage.js';

const quoteAuthor = document.querySelector('#quote-author');
const quoteText = document.querySelector('#quote-text');
const quoteId = document.querySelector('#quote-id');
const quoteButton = document.querySelector('#new-quote');
const favoriteButton = document.querySelector('#favorite');

window.addEventListener('DOMContentLoaded', DOMContentLoaded);
quoteButton.addEventListener('click', generateQuote)
favoriteButton.addEventListener('click', toggleFavorites);

function DOMContentLoaded() {
    generateQuote();
    updateNavbar();
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

export {
    generateQuote,
    toggleFavorites,
    changeFavoriteIcon
}