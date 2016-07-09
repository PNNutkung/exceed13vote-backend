var mongoose = require('mongoose');
var config = require('../config/database');
var jwt = require('jwt-simple');

module.exports = (app, passport, express) => {
    mongoose.connect(config.database);
    require('../config/passport')(passport);
    // bundle our routes
    var apiRoutes = express.Router();

    require('./user/userRoutes')(apiRoutes, passport, express, mongoose, getToken);

    require('./group/groupRoutes')(apiRoutes);

    // connect the api routes under /api/*
    app.use('/api', apiRoutes);
}

var getToken = (headers) => {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
