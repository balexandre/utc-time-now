const mongoose = require('mongoose');
const CustomerSchema = require('./customer');

// DATABASE SETUP
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// models
const customer = mongoose.model('customer', CustomerSchema);

// Handle the connection event
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('DB connection is alive');
});

db.models = { customer };

module.exports = db;
