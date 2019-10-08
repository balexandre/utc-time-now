const db = require('./../models');

exports.get = (req, res) => {
    const { ip } = req.params;
    db.models.customer.countDocuments(
        {
            ip,
        },
        (err, count) => {
            if (err) res.send(err);

            res.json({ ip, totalCount: count });
        }
    );
};
