var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../app/models/user');
var jwt = require('jwt-simple');
module.exports = (app, passport, express, bodyParser) => {
    mongoose.connect(config.database);
    require('../config/passport')(passport);

    // bundle our routes
    var apiRoutes = express.Router();

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
    apiRoutes.post('/authenticate', (req, res) => {
        User.findOne({
            username: req.body.username
        }, (error, user) => {
            if(error) throw error;
            if(!user) {
                res.send({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if(isMatch && !error) {
                        var token = jwt.encode(user, config.secret);
                        res.json({
                            success: true,
                            token: 'JWT' + token
                        });
                    } else {
                        res.send({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                    }
                });
            }
        });
    });

    // connect the api routes under /api/*
    app.use('/api', apiRoutes);
}
