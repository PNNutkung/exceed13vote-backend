var mongoose = require('mongoose');
var config = require('../config/database');
var jwt = require('jwt-simple');
var User = require('./../app/models/user');

module.exports = (app, passport, express) => {
    mongoose.connect(config.database);
    require('../config/passport')(passport);
    // bundle our routes
    var apiRoutes = express.Router();

    require('./user/userRoutes')(apiRoutes, passport, express, mongoose, getToken);

    require('./group/groupRoutes')(apiRoutes);

    require('./project/projectRoutes')(apiRoutes, mongoose, isAuthenticated);

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

var isAuthenticated = function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            username: decoded.username
        }, (error, user) => {
            if (error) throw error;
            if (!user) {
                res.send({
                    status: 403,
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                return next();
            }
        });
    } else {
        res.send({
            status: 403,
            success: false,
            message: 'Permission denied.'
        });
    }
};
