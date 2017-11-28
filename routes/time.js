var moment = require('moment');
var Customer = require('./../models/customer');

exports.get = function (req, res) {
    const time = moment.utc();
    let ip = req.headers['x-forwarded-for'] && req
        .headers['x-forwarded-for']
        .split(',')
        .pop() || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket
        ? req.connection.socket.remoteAddress
        : null);

    // override the annoying ::1
    if (ip === '::1') {
        ip = '127.0.0.1';
    }

    // log request
    Customer({ip})
        .save(function (err, data) {
            if (err)
                throw err;
            console.log('Request logged!');
        });

    // return object
    res.json({
        iso: time.toISOString(),
        date: time.format('YYYY-MM-DD HH:mm:ss'),
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        ip
    });
}
