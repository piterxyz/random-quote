const favoritesNav = document.querySelector('#favorites-nav')

window.addEventListener('DOMContentLoaded', updateNavbar);

function updateNavbar() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoritesNav.innerHTML = `Favorites (${favorites.length})`;
}

export {
    updateNavbar
};
