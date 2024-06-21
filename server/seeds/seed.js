const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

// imports json data for each model before seeding
const userData = require('./userData.json');

db.once('open', async () => {
    // calls the cleanDB function to remove any data and tables ensuring that the database is empty before data is added
    await cleanDB('User', 'users');


    // asynchronusly seeds data for each model logging a message after each action to verify its completion
    await User.insertMany(userData);
    console.log('--Users seeded--')



    console.log('---All Done---')
    process.exit(0);
})