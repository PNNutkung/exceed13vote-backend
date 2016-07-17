var Vote = require('./../../app/models/vote');
var User = require('./../../app/models/user');
var config = require('./../../config/database');
var jwt = require('jwt-simple');

module.exports = module.exports = (apiRoutes, mongoose, isAuthenticated) => {
    apiRoutes.get('/vote', (req, res) => {
        res.json({
            vote: 'hello it\'s me'
        });
    });

    apiRoutes.post('/vote', isAuthenticated, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        }, (error, user) => {
            if (error) throw error;
            if(!user) {
                return res.json({
                    status: 201,
                    success: false,
                    message: 'Vote failed, User not found.'
                });
            } else {
                return res.json({
                    status: 200,
                    success: true,
                    msssage: user.username
                });
            }
        });
    });
}

var decodeUsername = (headers) => {
    var parted = headers.authorization.split(' ');
    var decoded = jwt.decode(parted[1], config.secret);
    return decoded.username;
};
