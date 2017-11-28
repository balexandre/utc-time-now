// server.js BASE SETUP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

require('dotenv').config();

if (process.env.APP_ENVIRONMENT === 'local') {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
var router = express.Router();
var routes = require('./routes');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/time', routes.time.get);
router.get('/stats/:ip', routes.stats.get);

app.use(router);

app.all('*', function (req, res) {
    res.redirect(301, '/time');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API can be called on port ' + port);
