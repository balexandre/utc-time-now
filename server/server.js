// server.js BASE SETUP
// =============================================================================
const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

if (process.env.APP_ENVIRONMENT === 'local') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(
    cors({
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);

const port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
const router = express.Router();
const routes = require('./routes');

router.get('/time', routes.time.get);
router.get('/stats/:ip', routes.stats.get);

app.use(router);

app.all('*', (req, res) => {
    res.redirect(301, '/time');
});

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API can be called on http://localhost:${port}`);
});

// for tests
exports.server = app;
