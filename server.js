// server.js BASE SETUP
// =============================================================================
var moment = require('moment');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

// app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

router.all('/time', function (req, res) {
    const time = moment.utc();
    const ip = req
        .headers['x-forwarded-for']
        .split(',')
        .pop() || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket
        ? req.connection.socket.remoteAddress
        : null);

    res.json({
        iso: time.toISOString(),
        date: time.format('YYYY-MM-DD HH:mm:ss'),
        ip
    });
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API can be called on port ' + port);
