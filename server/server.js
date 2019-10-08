// server.js BASE SETUP
// =============================================================================
const express = require('express');

const app = express();
const morgan = require('morgan');

require('dotenv').config();

if (process.env.APP_ENVIRONMENT === 'local') {
    app.use(morgan('dev'));
}

app.use(express.json());

const port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
const router = express.Router();
const routes = require('./routes');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.get('/time', routes.time.get);
router.get('/stats/:ip', routes.stats.get);

app.use(router);

app.all('*', (req, res) => {
    res.redirect(301, '/time');
});

// START THE SERVER
// =============================================================================
app.listen(port);
// eslint-disable-next-line no-console
console.log(`API can be called on http://localhost:${port}`);

// for tests
exports.server = app;
