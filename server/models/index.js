/* eslint-disable no-console */

const mongoose = require('mongoose');
const CustomerSchema = require('./customer');

const MONGO_URL = process.env.MONGODB_URI || 'mongodb://mongo:27017/utc_now';

// DATABASE SETUP
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log('Error ocurred while connecting to DB!');
    else console.log('Database connection established successfully');
});

// models
const customer = mongoose.model('customer', CustomerSchema);

// Handle the connection event
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('DB connection is alive');
});

db.models = { customer };

module.exports = db;
