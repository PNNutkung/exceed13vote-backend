var Project = require('./../../app/models/project');
var User = require('./../../app/models/user');
var Comment = require('./../../app/models/comment');

module.exports = (apiRoutes, mongoose, isAuthenticated, decodeUsername, errorHandle) => {
    apiRoutes.get('/comment', isAuthenticated, isPassAllRequireGet, (req, res) => {
        Comment.find({
            project: mongoose.Types.ObjectId(req.headers.project_id)
        }, (err, comments) => {
            if(err) return errorHandle(res);
            return res.json({
                status: 200,
                success: true,
                comments: comments
            });
        });
    });

    apiRoutes.post('/comment', isAuthenticated, isPassAllRequirePost, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
                username: tokenUsername
            })
            .exec((error, user) => {
                if (error) return errorHandle(res);
                if (!user) {
                    return res.json({
                        status: 201,
                        success: false,
                        message: 'Comment failed, user not found.'
                    });
                } else if(!user.teacher) {
                    return res.json({
                        status: 403,
                        success: false,
                        message: 'You don\'t have a permission.'
                    });
                } else {
                    var newComment = new Comment({
                        username: user.username,
                        project: mongoose.Types.ObjectId(req.body.project_id),
                        detail: req.body.detail
                    });
                    newComment.save((error) => {
                        console.log(error);
                        if (error) {
                            return res.json({
                                status: 203,
                                success: false,
                                message: 'Comment already exists.'
                            });
                        }
                        return res.json({
                            status: 200,
                            success: true,
                            message: 'Successful comment.'
                        });
                    });
                }
            });
    });

    apiRoutes.put('/comment', isAuthenticated, isPassAllRequirePut, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        })
        .exec((err, user) => {
            Comment.findOne({
                _id: mongoose.Types.ObjectId(req.body.comment_id)
            })
            .exec((err, comment) => {
                if(err) return errorHandle(res);
                if(user.username !== comment.username || !user.teacher) {
                    return res.json({
                        status: 403,
                        success: false,
                        message: 'You don\'t have a permission.'
                    });
                }
                comment.detail = req.body.detail;
                comment.save();
                return res.json({
                    status: 200,
                    success: true,
                    message: 'Save change successfully.'
                });
            });
        });
    });
};

var isPassAllRequirePost = function(req, res, next) {
    if (!req.body.project_id || !req.body.detail) {
        return res.json({
            status: 202,
            success: false,
            message: 'Please pass all required data.'
        });
    }
    return next();
};

var isPassAllRequirePut = function(req, res, next) {
    if (!req.body.comment_id || !req.body.detail) {
        return res.json({
            status: 202,
            success: false,
            message: 'Please pass all required data.'
        });
    }
    return next();
};

var isPassAllRequireGet = (req, res, next) => {
    if (!req.headers.project_id) {
        return res.json({
            status: 202,
            success: false,
            message: 'Please pass all required data.'
        });
    }
    return next();
};
