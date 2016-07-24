var Project = require('./../../app/models/project');
var User = require('./../../app/models/user');
module.exports = (apiRoutes, mongoose, isAuthenticated, decodeUsername, errorHandle) => {
    apiRoutes.post('/project', isAuthenticated, isPassAllRequire, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
                username: tokenUsername
            })
            .populate('group')
            .exec((error, user) => {
                if (error) return errorHandle(res);
                if (!user) {
                    return res.json({
                        status: 201,
                        success: false,
                        message: 'Create project failed, user not found.'
                    });
                } else {
                    var newProject = new Project({
                        name: req.body.name,
                        image_url: req.body.image_url,
                        group: mongoose.Types.ObjectId(user.group._id),
                        content: JSON.parse(req.body.content)
                    });
                    newProject.save((error) => {
                        if (error) {
                            return res.json({
                                status: 203,
                                success: false,
                                message: 'Project already exists.'
                            });
                        }
                        return res.json({
                            status: 200,
                            success: true,
                            message: 'Successful created new project.'
                        });
                    });
                }
            });
    });

    apiRoutes.put('/project', isAuthenticated, isPassAllRequire, (req, res) => {
        var tokenUsername = decodeUsername(req.headers);
        User.findOne({
            username: tokenUsername
        })
        .populate('group')
        .exec((err, user) => {
            Project.findOne({
                _id: mongoose.Types.ObjectId(req.body.project_id)
            })
            .populate('group')
            .exec((err, project) => {
                if(err) return errorHandle(res);
                if(user.group._id.toString() !== project.group._id.toString()) {
                    return res.json({
                        status: 403,
                        success: false,
                        message: 'You don\'t have a permission.'
                    });
                }
                project.name = req.body.name;
                project.image_url = req.body.image_url;
                project.content = req.body.content;
                project.save();
                return res.json({
                    status: 200,
                    success: true,
                    message: 'Save change successfully.'
                });
            });
        });
    });

    apiRoutes.get('/project', (req, res) => {
        Project
            .find({})
            .populate('group')
            .exec((error, projects) => {
                if (error) return errorHandle(res);
                return res.json({
                    status: 200,
                    success: true,
                    projects: projects
                });
            });
    });
};

var isPassAllRequire = function(req, res, next) {
    if (!req.body.name || !req.body.image_url || !req.body.content) {
        return res.json({
            status: 202,
            success: false,
            message: 'Please pass all required data.'
        });
    }
    return next();
};
