async function getQuoteById(id) {
    const response = await fetch(`https://api.quotable.io/quotes/${id}`);
    const data = await response.json();

    return data;
}

export {
    getQuoteById
}