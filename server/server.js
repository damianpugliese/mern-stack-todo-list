const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');

// App & Port
const app = express();
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB
const mongoURI = require('./config/config').mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`${chalk.green('✓')} ${chalk.blue(`Base de datos conectada...`)}`)
})
.catch(err => console.log(err));

// Rutas
const todoRoutes = require('./routes/todo');
app.use('/api/todo', todoRoutes);

// Contenido Estático en producción
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

}

app.listen(PORT, () =>
    console.log(`${chalk.green('✓')} ${chalk.blue(`Servidor iniciado en puerto ${PORT}`)}`)
);
