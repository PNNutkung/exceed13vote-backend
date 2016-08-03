module.exports = function(apiRoutes) {
    apiRoutes.get('/time', function(req, res) {
        return res.json({
            status: 200,
            message: 'eXceed vote will be closed in',
            round: 'document',
            remain_time: '8/4/2016, 5:45:00 PM'
        });
    });
};
