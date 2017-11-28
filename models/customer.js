var db = require('./database');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    ip: String,
    request: { type: Date, default: Date.now }
});

module.exports = mongoose.model('customer', CustomerSchema);
