module.exports = (apiRoutes) => {
    apiRoutes.get('/time', (req, res) => {
        return res.json({
            message: 'eXceed vote will be closed in',
            round: 'document',
            remain_time: '7/29/2016, 6:00:00 PM'
        });
    });
};
