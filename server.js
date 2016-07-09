var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var User = require('./app/models/user');
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Show log on console
app.use(morgan('dev'))

app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('There will be dragons: http://localhost:' + port);

require('./services/databaseService')(app, mongoose, passport, config, express, jwt, bodyParser, User);
