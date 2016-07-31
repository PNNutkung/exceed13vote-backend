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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, project_id, Authorization, o-Requested-With");
  next();
});
// Show log on console
app.use(morgan('dev'));

app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('eXceed13vote online @ http://localhost:' + port);

require('./routes/routesManager')(app, passport, express);
