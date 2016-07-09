var Project = require('./../../app/models/project');
module.exports = (apiRoutes, mongoose) => {
    apiRoutes.post('/project', (req, res) => {
        if(!req.body.name || !req.body.image_url || !req.body.group_id || !req.body.header || !req.body.content) {
            res.json({
                status: 403,
                success: false,
                message: 'Please pass all require data.'
            });
        } else {
            var newProject = new Project({
                name: req.body.name,
                image_url: req.body.image_url,
                group_id: mongoose.Types.ObjectId(req.body.group_id),
                header: req.body.header,
                content: req.body.content
            });
            newProject.save( (error) => {
                if(error) {
                    console.log(error);
                    return res.json({
                        status: 403,
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

    apiRoutes.get('/project', (req, res) => {
        Project
        .find({

        })
        .populate('group_id')
        .exec((error, projects) => {
            res.json({
                status: 200,
                success: true,
                projects: projects
            });
        });
    });
};
