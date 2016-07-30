var mongoose = require('mongoose');
var config = require('../config/database');
var jwt = require('jwt-simple');
var User = require('./../app/models/user');

module.exports = function(app, passport, express) {
    mongoose.connect(config.database);
    require('../config/passport')(passport);
    // bundle our routes
    var apiRoutes = express.Router();

    require('./user/userRoutes')(apiRoutes, passport, mongoose, errorHandle);

    require('./group/groupRoutes')(apiRoutes, mongoose, errorHandle);

    require('./project/projectRoutes')(apiRoutes, mongoose, isAuthenticated, decodeUsername, errorHandle);

    require('./vote/voteRoutes')(apiRoutes, mongoose, isAuthenticated, decodeUsername, errorHandle);

    require('./comment/commentRoutes')(apiRoutes, mongoose, isAuthenticated, decodeUsername, errorHandle);

    require('./time/timeRoutes')(apiRoutes);
    // connect the api routes under /api/*
    app.use('/api', apiRoutes);
};

var getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 3 && parted[0] === 'eXceed13vote') {
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
        var decoded;
        try {
            decoded = jwt.decode(token, config.secret);
        } catch (e) {
            return res.json({
                status: 201,
                success: false,
                message: 'Authentication failed. Use fake token!'
            });
        }
        User.findOne({
            username: decoded.username
        }, function(error, user) {
            if (error) throw error;
            if (!user) {
                return res.json({
                    status: 201,
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                return next();
            }
        });
    } else {
        return res.json({
            status: 202,
            success: false,
            message: 'Please login first.'
        });
    }
};

var decodeUsername = function(headers) {
    var parted = headers.authorization.split(' ');
    var decoded = jwt.decode(parted[1], config.secret);
    return decoded.username;
};

var errorHandle = (res) => {
    return res.json({
        status: 206,
        success: false,
        message: 'Error please check your parameter.'
    });
};
