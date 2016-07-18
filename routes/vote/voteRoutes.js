var Vote = require('./../../app/models/vote');
var User = require('./../../app/models/user');
var Project = require('./../../app/models/project');
var config = require('./../../config/database');
var jwt = require('jwt-simple');

module.exports = module.exports = (apiRoutes, mongoose, isAuthenticated, decodeUsername) => {
    apiRoutes.post('/vote/check_voted', isAuthenticated, categoryCheck, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        }, (error, user) => {
            if (error) throw error;
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
                    if (error) throw error;
                    return res.json({
                        status: 200,
                        success: true,
                        username: user.username,
                        available: vote.length === 0
                    });
                });
        });
    });

    apiRoutes.post('/vote/average', categoryCheck, (req, res) => {
        Vote.find({
                vote_category: req.body.category
            })
            .where('project').equals(mongoose.Types.ObjectId(req.body.project_id))
            .populate({
                path: 'project',
                populate: {
                    path: 'group'
                }
            })
            .exec((error, votes) => {
                if (error) throw error;
                var total = 0;
                votes.forEach((vote) => {
                    total += vote.score;
                });
                Project.find({
                        _id: req.body.project_id
                    })
                    .populate('group')
                    .exec((error, project) => {
                        return res.json({
                            status: 200,
                            success: true,
                            project: project[0].name,
                            group: project[0].group.group_name,
                            average: votes.length === 0 ? 0 : total / votes.length
                        });
                    })
            });
    });

    apiRoutes.post('/vote', isAuthenticated, categoryCheck, (req, res) => {
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
                    project: mongoose.Types.ObjectId(req.body.project_id),
                    score: req.body.score
                });
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
            }
        });
    });
}

var categoryCheck = function(req, res, next) {
    switch (req.body.category) {
        case 'best_of_hardware':
            return next();
        case 'best_of_software':
            return next();
        case 'popular':
            return next();
        case 'top_rated':
            return next();
        default:
            return res.json({
                status: 201,
                success: false,
                message: 'Wrong category type!'
            });
    }
};
