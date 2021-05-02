const path = require('path');

module.exports = {
    webpack: {
        extensions: ['*', '.js', 'jsx'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@components': path.resolve(__dirname, 'src/library/components'),
            '@elements': path.resolve(__dirname, 'src/library/elements'),
            '@form': path.resolve(__dirname, 'src/library/form'),
            '@layout': path.resolve(__dirname, 'src/library/layout'),
            '@service': path.resolve(__dirname, 'src/library/services'),
            '@utils': path.resolve(__dirname, 'src/library/utils'),
            '#': path.resolve(__dirname, 'src')
        }
    }
};
