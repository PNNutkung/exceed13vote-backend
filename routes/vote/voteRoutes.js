var Vote = require('./../../app/models/vote');
var User = require('./../../app/models/user');
var Project = require('./../../app/models/project');
var CheckVote = require('./../../app/models/checkVote');
var config = require('./../../config/database');
var jwt = require('jwt-simple');

module.exports = (apiRoutes, mongoose, isAuthenticated, decodeUsername, errorHandle) => {
    apiRoutes.get('/vote/check_vote', isAuthenticated, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        }, (error, user) => {
            if (error) return errorHandle(res);
            CheckVote.find({
                    username: user.username
                })
                .where('project').equals(mongoose.Types.ObjectId(req.headers.project_id))
                .populate({
                    path: 'project',
                    populate: {
                        path: 'group'
                    }
                })
                .exec((err, checkVote) => {
                    if (err) return errorHandle(res);
                    if (checkVote.length === 0) {
                        var newCheckVote = new CheckVote({
                            username: user.username,
                            project: mongoose.Types.ObjectId(req.headers.project_id)
                        });
                        newCheckVote.save((error) => {
                            if (error) {
                                return res.json({
                                    status: 201,
                                    success: false,
                                    message: 'Check vote failed.'
                                });
                            }
                        });
                        return res.json({
                            status: 200,
                            success: true,
                            username: user.username,
                            best_of_hardware: newCheckVote.best_of_hardware,
                            best_of_software: newCheckVote.best_of_software,
                            popular: newCheckVote.popular
                        });
                    }
                    return res.json({
                        status: 200,
                        success: true,
                        username: user.username,
                        best_of_hardware: checkVote[0].best_of_hardware,
                        best_of_software: checkVote[0].best_of_software,
                        popular: checkVote[0].popular
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
                if (error) return errorHandle(res);
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
            if (error) return errorHandle(res);
            if (!user) {
                return res.json({
                    status: 201,
                    success: false,
                    message: 'Vote failed, User not found.'
                });
            } else if(user.teacer) {
                for(var i = 0; i < 3 ; ++i) {
                    var newVote = new Vote({
                        vote_user: mongoose.Types.ObjectId(user._id),
                        vote_category: req.body.category,
                        project: mongoose.Types.ObjectId(req.body.project_id),
                        score: req.body.score
                    });
                    newVote.save((err) => {
                        if (error) {
                            return res.json({
                                status: 201,
                                success: false,
                                message: 'Vote failed.'
                            });
                        }
                        CheckVote.findOne({
                            username: user.username,
                            project: mongoose.Types.ObjectId(req.body.project_id)
                        }, (err, checkVote) => {
                            switch (req.body.category) {
                                case 'best_of_hardware':
                                    checkVote.best_of_hardware = false;
                                    break;
                                case 'best_of_software':
                                    checkVote.best_of_software = false;
                                    break;
                                case 'popular':
                                    checkVote.popular = false;
                                    break;
                            }
                            checkVote.save();
                            Project.findOne({
                                _id: mongoose.Types.ObjectId(req.body.project_id)
                            }, function(err, project) {
                                project.total_score += req.body.score;
                                project.save();
                            });
                        });
                    });
                }
                return res.json({
                    status: 200,
                    success: true,
                    message: 'Vote successfully.'
                });
            } else {
                if(req.body.score > -1) {
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
                        CheckVote.findOne({
                            username: user.username,
                            project: mongoose.Types.ObjectId(req.body.project_id)
                        }, (err, checkVote) => {
                            switch (req.body.category) {
                                case 'best_of_hardware':
                                    checkVote.best_of_hardware = false;
                                    break;
                                case 'best_of_software':
                                    checkVote.best_of_software = false;
                                    break;
                                case 'popular':
                                    checkVote.popular = false;
                                    break;
                            }
                            checkVote.save();
                            Project.findOne({
                                _id: mongoose.Types.ObjectId(req.body.project_id)
                            }, function(err, project) {
                                console.log('Total score: '+project.total_score);
                                project.total_score += req.body.score;
                                project.save();
                            });
                        });
                        return res.json({
                            status: 200,
                            success: true,
                            message: 'Vote successfully.'
                        });
                    });
                } else {
                    return res.json({
                        status: 200,
                        success: false,
                        message: 'You did not vote.'
                    });
                }
            }
        });
    });

    apiRoutes.get('/vote/top_rated', function(req, res) {
        Project.find()
        .sort({
            total_score: -1
        })
        .limit(1)
        .exec(function(err, project){
            if(err)
                return errorHandle();
            else
                return res.json({
                    project: project[0]
                });
        });
    });
};

var categoryCheck = function(req, res, next) {
    switch (req.body.category) {
        case 'best_of_hardware':
            return next();
        case 'best_of_software':
            return next();
        case 'popular':
            return next();
        default:
            return res.json({
                status: 201,
                success: false,
                message: 'Wrong category type!'
            });
    }
};
