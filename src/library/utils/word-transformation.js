export const currencyFormat = (word = 0, fixed = 2) => {
    if (word) {
        return word
            .toFixed(fixed)
            .toString()
            .replace('.', ',')
            .replace(/\,00$/, '')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
};

export const limitWord = (word, len = 30) => {
    if (word) return word.slice(0, len) + (word.length > len ? '...' : '');
};
