var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080;

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

require('./services/routes')(app, passport, express);
