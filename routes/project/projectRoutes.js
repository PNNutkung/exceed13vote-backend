var Project = require('./../../app/models/project');
var User = require('./../../app/models/user');
module.exports = (apiRoutes, mongoose, isAuthenticated, decodeUsername) => {
    apiRoutes.post('/project', isAuthenticated, (req, res) => {
        if (!req.body.name || !req.body.image_url || !req.body.header || !req.body.content) {
            res.json({
                status: 202,
                success: false,
                message: 'Please pass all required data.'
            });
        } else {
            var tokenUsername = decodeUsername(req.headers);
            User.findOne({
                username: tokenUsername
            })
            .populate('group')
            .exec( (error, user) => {
                if(error) throw error;
                if(!user) {
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
                        header: req.body.header,
                        content: req.body.content
                    });
                    newProject.save((error) => {
                        if (error) {
                            return res.json({
                                status: 203,
                                success: false,
                                message: 'Project already exists.'
                            });
                        }
                        res.json({
                            status: 200,
                            success: true,
                            message: 'Successful created new project.'
                        });
                    });
                }
            });
        }
    });

    apiRoutes.get('/project', (req, res) => {
        Project
            .find({})
            .populate('group')
            .exec((error, projects) => {
                if (error) throw error;
                res.json({
                    status: 200,
                    success: true,
                    projects: projects
                });
            });
    });
};
