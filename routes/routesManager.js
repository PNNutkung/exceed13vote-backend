var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../app/models/user');

module.exports = (app, passport, express) => {
    mongoose.connect(config.database);
    require('../config/passport')(passport);
    // bundle our routes
    var apiRoutes = express.Router();

    require('./user/userRoutes')(apiRoutes, passport, express, mongoose);

    // connect the api routes under /api/*
    app.use('/api', apiRoutes);
}
