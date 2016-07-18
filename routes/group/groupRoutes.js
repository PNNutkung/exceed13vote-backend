var Group = require('./../../app/models/group');
var User = require('./../../app/models/user');

module.exports = (apiRoutes, mongoose) => {
    apiRoutes.get('/groups', (req, res) => {
        Group
        .find({},
        (error, groups) => {
            if(error) throw error;
            res.json({
                status: 200,
                success: true,
                groups: groups
            });
        });
    });

    apiRoutes.post('/groups/member', (req,res) => {
        User.find({
            group: mongoose.Types.ObjectId(req.body.group)
        })
        .populate('group')
        .exec((error, users) => {
            if(error) throw error;
            var usersArray = [];
            users.forEach((user) => {
                usersArray.push(user.username);
            });
            return res.json({
                status: 200,
                success: true,
                group_name: users[0].group.group_name,
                members: usersArray
            });
        });
    });
};
