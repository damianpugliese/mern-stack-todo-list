require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const config = require('./config/config')


// App & Port
const app = express();
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connect
const db = config.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`${chalk.green('✓')} ${chalk.blue(`MongoDB connected...`)}`)
    })
    .catch(err => console.log(err));

// Routes
const tasks = require('./routes/api/tasks');
app.use('/api/tasks', tasks);

// Serve React Frontend
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

}

//  Server Init
app.listen(PORT, () =>
    console.log(`${chalk.green('✓')} ${chalk.blue(`Server listen on port ${PORT}`)}`)
);
