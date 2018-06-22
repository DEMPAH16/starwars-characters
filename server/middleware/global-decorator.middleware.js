const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const addDb = require('./add-db.middleware');

function globalDecorator(app) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(addDb);
    app.use(session({
        name: 'starwars-character-store',
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
    }));

    app.use(express.static(__dirname + '/../build'));
}

module.exports = globalDecorator;