module.exports = function(apiRoutes) {
    apiRoutes.get('/time', function(req, res) {
        return res.json({
            status: 200,
            message: 'eXceed vote will be closed in',
            round: 'document',
            remain_time: '7/30/2016, 6:00:00 PM'
        });
    });
};
