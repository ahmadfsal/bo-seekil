export const currencyFormat = (word, fixed = 2) => {
    return word
        .toFixed(fixed)
        .toString()
        .replace('.', ',')
        .replace(/\,00$/, '')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const limitWord = (word, len = 30) => {
    return word.slice(0, len) + (word.length > len ? '...' : '');
}
