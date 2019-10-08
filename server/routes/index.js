const fs = require('fs');

const route = {};

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        const name = file.substr(0, file.indexOf('.'));
        // eslint-disable-next-line global-require
        route[name] = require(`./${name}`); // eslint-disable-line import/no-dynamic-require
    }
});

module.exports = route;
