var jwt = require('jwt-simple');
var config = require('./../../config/database');
var User = require('./../../app/models/user');

module.exports = (apiRoutes, passport, mongoose, errorHandle) => {

    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/signup', (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.json({
                status: 202,
                success: false,
                message: 'Please pass name and password.'
            });
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                group: mongoose.Types.ObjectId(req.body.group)
            });
            newUser.save((error) => {
                if (error) {
                    return res.json({
                        status: 203,
                        success: false,
                        message: 'Username already exists.'
                    });
                }
                return res.json({
                    status: 200,
                    success: true,
                    message: 'Successful created new user.'
                });
            });
        }
    });

    // route to authenticate user (POST http://localhost:8080/api/login)
    apiRoutes.post('/login', (req, res) => {
        User.findOne({
            username: req.body.username
        }, (error, user) => {
            if(error) return errorHandle(res);
            if (!user) {
                return res.json({
                    status: 203,
                    success: false,
                    message: 'Authentication failed. Wrong username or password.'
                });
            } else {
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if (isMatch && !error) {
                        var token = jwt.encode(user, config.secret);
                        User
                            .findOne({
                                username: user.username
                            })
                            .populate('group')
                            .exec((error, user) => {
                                if(error) {
                                    return res.json({
                                        status: 201,
                                        success: false,
                                        message: 'Authentication failed. Wrong username or password.'
                                    });
                                }
                                return res.json({
                                    status: 200,
                                    success: true,
                                    username: user.username,
                                    group: user.group.group_name,
                                    teacher: user.teacher,
                                    token: 'eXceed13vote ' + token + ' 20160729'
                                })
                            });
                    } else {
                        return res.json({
                            status: 201,
                            success: false,
                            message: 'Authentication failed. Wrong username or password.'
                        });
                    }
                });
            }
        });
    });
};
