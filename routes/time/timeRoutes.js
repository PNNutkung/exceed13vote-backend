module.exports = function(apiRoutes) {
    apiRoutes.get('/time', function(req, res) {
        return res.json({
            status: 200,
            message: 'Vote will be closed in',
            round: 'vote',
            remain_time: '8/4/2016, 5:45:00 PM'
        });
    });
};
