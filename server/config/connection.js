const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = process.env.DB_URL;

mongoose.connect(process.env.MONGODB_URI || databaseUrl);

module.exports = mongoose.connection;