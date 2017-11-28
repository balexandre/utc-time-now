// server.js

// BASE SETUP
// =============================================================================
var moment     = require('moment');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES 
// =============================================================================
var router = express.Router();

router.get('/', function (req, res) {
    const time = moment.utc();
    res.json({
        iso: time.toISOString(),
        date: time.format('YYYY-MM-DD HH:mm:ss')
    });
});

app.use('/time', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on http://localhost:' + port);