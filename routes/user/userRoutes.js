var jwt = require('jwt-simple');
var config = require('./../../config/database');
var User = require('./../../app/models/user');

module.exports = (apiRoutes, passport, mongoose) => {

    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/signup', (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({
                status: 403,
                success: false,
                message: 'Please pass name and password.'
            });
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                group_id: mongoose.Types.ObjectId(req.body.group_id)
            });
            newUser.save((error) => {
                if (error) {
                    console.log(error);
                    return res.json({
                        status: 403,
                        success: false,
                        message: 'Username already exists.'
                    });
                }
                res.json({
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
                        User
                            .findOne({
                                username: user.username
                            })
                            .populate('group_id')
                            .exec((error, user) => {
                                if(error) {
                                    res.json({
                                        status: 403,
                                        success: false,
                                        message: 'Cannot found user.'
                                    });
                                }
                                res.json({
                                    status: 200,
                                    success: true,
                                    username: user.username,
                                    group_name: user.group_id.group_name,
                                    vote: user.vote,
                                    token: 'eXceed13vote ' + token + ' 20160729'
                                })
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
};
