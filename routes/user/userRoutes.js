var jwt = require('jwt-simple');
var config = require('./../../config/database');
var User = require('./../../app/models/user');

module.exports = (apiRoutes, passport, express, mongoose) => {

    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/signup', (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({
                success: false,
                message: 'Please pass name and password.'
            });
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            newUser.save((error) => {
                if (error) {
                    console.log(error);
                    return res.json({
                        success: false,
                        message: 'Username already exists.'
                    });
                }
                res.json({
                    success: true,
                    message: 'Successful created new user.'
                });
            });
        }
    });

    // route to authenticate user (POST http://localhost:8080/api/authenticate)
    apiRoutes.post('/login', (req, res) => {
        User.findOne({
            username: req.body.username
        }, (error, user) => {
            if (error) throw error;
            if (!user) {
                res.send({
                    status: 403,
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if (isMatch && !error) {
                        var token = jwt.encode(user, config.secret);
                        res.json({
                            status: 200,
                            success: true,
                            username: user.username,
                            /*group: user.group,
                            quota: user.quota,*/
                            token: 'JWT ' + token
                        });
                    } else {
                        res.send({
                            status: 403,
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                    }
                });
            }
        });
    });

    // route to a restricted info (GET http://localhost:8080/api/userinfo)
    apiRoutes.get('/userinfo', passport.authenticate('jwt', {
        session: false
    }), (req, res) => {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                username: decoded.username
            }, (error, user) => {
                if (error) throw error;
                if (!user) {
                    return res.status(403).send({
                        status: 403,
                        success: false,
                        message: 'Authentication failed. User not found.'
                    });
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        username: user.username,
                        /*group: user.group,
                        quota: user.quota,*/
                        message: 'Welcome to website ' + user.username + '!'
                    });
                }
            });
        } else {
            return res.status(403).send({
                status: 403,
                success: false,
                message: 'No token provided.'
            });
        }
    });
};

getToken = (headers) => {
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
