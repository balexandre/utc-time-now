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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.all('/time', function (req, res) {
    const time = moment.utc();
    const ip = req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',').pop()
        || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket
        ? req.connection.socket.remoteAddress
        : null);

    res.json({
        iso: time.toISOString(),
        date: time.format('YYYY-MM-DD HH:mm:ss'),
        ip
    });
});

app.all('*', function (req, res) {
    res.redirect(301, '/time');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API can be called on port ' + port);
