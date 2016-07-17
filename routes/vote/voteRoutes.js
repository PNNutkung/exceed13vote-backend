var Vote = require('./../../app/models/vote');
var User = require('./../../app/models/user');
var config = require('./../../config/database');
var jwt = require('jwt-simple');

module.exports = module.exports = (apiRoutes, mongoose, isAuthenticated, decodeUsername) => {
    apiRoutes.post('/vote/check_voted', (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        }, (error, user) => {
            if(error)
                return res.json({
                    status: 403,
                    success: false,
                    message: 'Permission denied.'
                });
            Vote.find({
                vote_category: req.body.category
            })
                .where('vote_user').equals(mongoose.Types.ObjectId(user._id))
                .where('project').equals(mongoose.Types.ObjectId(req.body.project_id))
                .populate({
                    path: 'project',
                    populate: {
                        path: 'group'
                    }
                })
                .exec((error, vote) => {
                    if(error)
                        return res.json({
                            status: 403,
                            success: false,
                            message: 'Permission denied.'
                        });
                    return res.json({
                        status: 201,
                        success: false,
                        available: vote.length === 0
                    });
                });
        });
    });

    apiRoutes.post('/vote/average', (req, res) => {
        Vote.find({
                vote_category: req.body.category
            })
            .populate('vote_user')
            .populate({
                path: 'project',
                populate: {
                    path: 'group',
                    match: {
                        group_name: req.body.group_name
                    }
                }
            })
            .exec((error, votes) => {
                if (error) throw error;
                return res.json({
                    status: 200,
                    success: true,
                    votes: votes
                });
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
                if (userVoteVerify(req.body, user)) {
                    var newVote = new Vote({
                        vote_user: mongoose.Types.ObjectId(user._id),
                        vote_category: req.body.category,
                        project: mongoose.Types.ObjectId(req.body.project),
                        score: req.body.score
                    });
                    updateUserVote(req.body, user);
                    newVote.save((error) => {
                        if (error) {
                            return res.json({
                                status: 201,
                                success: false,
                                message: 'Vote failed.'
                            });
                        }
                        return res.json({
                            status: 200,
                            success: true,
                            message: 'Vote successfully.'
                        });
                    });
                } else {
                    return res.json({
                        status: 201,
                        success: false,
                        message: 'You have voted already.'
                    });
                }
            }
        });
    });
}

var userVoteVerify = (body, user) => {
    var voteType = body.category;
    switch (voteType) {
        case 'best_of_hardware':
            return user.vote_hardware === 1 ? true : false;
        case 'best_of_software':
            return user.vote_software === 1 ? true : false;
        case 'popular':
            return user.vote_popular === 1 ? true : false;
        case 'top_rated':
            user.vote_top_rate === 1 ? true : false;
        default:
            return false;
    }
};

var updateUserVote = (body, user) => {
    var voteType = body.category;
    switch (voteType) {
        case 'best_of_hardware':
            user.vote_hardware = 0;
            break;
        case 'best_of_software':
            user.vote_software = 0;
            break;
        case 'popular':
            user.vote_popular = 0;
            break;
        case 'top_rated':
            user.vote_top_rate = 0;
            break;
    }
    user.save();
}
