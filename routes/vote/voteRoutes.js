var Vote = require('./../../app/models/vote');
var User = require('./../../app/models/user');
var config = require('./../../config/database');
var jwt = require('jwt-simple');

module.exports = module.exports = (apiRoutes, mongoose, isAuthenticated) => {
    apiRoutes.get('/vote', (req, res) => {
        Vote.find({})
            .populate('vote_user')
            .populate('group')
            .exec((error, votes) => {
                if (error) throw error;
                res.json({
                    status: 200,
                    success: true,
                    votes: votes
                })
            });
    });

    apiRoutes.post('/vote', isAuthenticated, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        }, (error, user) => {
            if (error) throw error;
            if (!user) {
                return res.json({
                    status: 201,
                    success: false,
                    message: 'Vote failed, User not found.'
                });
            } else {
                var newVote = new Vote({
                    vote_user: mongoose.Types.ObjectId(user._id),
                    vote_category: req.body.category,
                    group: mongoose.Types.ObjectId(req.body.group_id),
                    score: req.body.score
                });
                newVote.save((error) => {
                    if (error) {
                        console.log(error);
                        return res.json({
                            status: 201,
                            success: false,
                            message: 'Vote failed.'
                        });
                    }
                    res.json({
                        status: 200,
                        success: true,
                        message: 'Vote successfully.'
                    });
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
