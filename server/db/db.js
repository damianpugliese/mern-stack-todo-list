// Dependecies
const mongoose = require('mongoose');
const chalk = require('chalk');

// Config Variables
const config = require('../config/config');

// MongoDB Uri
const db = config.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log(`${chalk.green('✓')} ${chalk.blue(`MongoDB connected...`)}`)
    })
    .catch(err => console.log(err));
