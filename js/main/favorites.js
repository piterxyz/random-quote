import { updateNavbar } from './navbar.js';
import { getLocalStorage } from '../util/localStorage.js';
import { getQuoteById } from '../util/quotes.js';

const favoriteId = document.querySelector('#favorite-id');
const favoriteText = document.querySelector('#favorite-text');
const favoriteTitle = document.querySelector('#favorite-title');
const favoriteAuthor = document.querySelector('#favorite-author');

const clearAllFavoritesBtn = document.querySelector('#clear-all-favorites');
const deleteFavoriteBtn = document.querySelector('#delete-favorite');

const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');

clearAllFavoritesBtn.addEventListener('click', clearAllFavorites);
deleteFavoriteBtn.addEventListener('click', deleteFavorite);
window.addEventListener('DOMContentLoaded', DOMContentLoaded);

leftArrow.addEventListener('click', previousFavorite);
rightArrow.addEventListener('click', nextFavorite);

function DOMContentLoaded() {
    updateFavorite();
    updateNavbar();
}

async function updateFavorite(index = 0) {
    const favorites = getLocalStorage('favorites');
    const favorite = await getQuoteById(favorites[index]);

    if (favorites.length > 0 && index < favorites.length) {
        favoriteTitle.innerHTML = `Favorite <span id="favorite-id">#${index + 1}</span>`;
        favoriteText.innerText = `"${favorite.content}"`;
        favoriteAuthor.innerText = favorite.author;

        if(index != 0 && favorites[index - 1]) leftArrow.classList.add('active')
        else leftArrow.classList.remove('active')
        if(index != favorites.length - 1) rightArrow.classList.add('active')
        else rightArrow.classList.remove('active')
    } else {
        favoriteTitle.innerText = '';
        favoriteText.innerHTML = `Favorite quotes list is empty.<br>Go to the <a href="index.html">home page</a> to add a new quote.`;
        favoriteAuthor.innerText = '';

        toggleHidden();
    }
}

function nextFavorite() {
    if(!rightArrow.classList.contains('active')) return;
    const index = parseInt(favoriteTitle.innerText.replace('Favorite #', '')) - 1;

    updateFavorite(index + 1);
}

function previousFavorite() {
    if(!leftArrow.classList.contains('active')) return;
    const index = parseInt(favoriteTitle.innerText.replace('Favorite #', '')) - 1;

    updateFavorite(index - 1);
}


function deleteFavorite() {
    const favorites = getLocalStorage('favorites');
    const index = parseInt(favoriteTitle.innerText.replace('Favorite #', '')) - 1;

    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavorite(index == 0 ? 0 : index - 1);
    updateNavbar();
}

function clearAllFavorites() {
    localStorage.removeItem('favorites')
    updateNavbar();
    updateFavorite();
}

function toggleHidden() {
    leftArrow.classList.toggle('hidden');
    rightArrow.classList.toggle('hidden');
    clearAllFavoritesBtn.classList.toggle('hidden');
    deleteFavoriteBtn.classList.toggle('hidden');
    document.querySelector('#separator').classList.toggle('hidden');
}

export {
    updateFavorite,
    nextFavorite,
    previousFavorite,
    getQuoteById,
    deleteFavorite,
    clearAllFavorites,
    toggleHidden
}