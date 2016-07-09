var Group = require('./../../app/models/group')
module.exports = (apiRoutes, express, mongoose) => {
    apiRoutes.get('/groups', (req, res) => {
        Group
        .find({

        },
        (error, groups) => {
            if(error) throw error;
            res.json(groups);
        });
    });
};
