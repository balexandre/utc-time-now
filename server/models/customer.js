const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    ip: String,
    request: { type: Date, default: Date.now },
});

module.exports = schema;
