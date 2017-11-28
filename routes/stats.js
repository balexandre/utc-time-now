var Customer = require('./../models/customer');

exports.get = function (req, res) {
    const ip = req.params.ip;
    Customer.count({
        ip
    }, function (err, data) {
        if (err)
            res.send(err);

        res.json({ip: ip, totalCount: data});
    });
};
