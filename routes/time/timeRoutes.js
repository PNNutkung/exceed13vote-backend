module.exports = (apiRoutes) => {
    apiRoutes.get('/time', (req, res) => {
        return res.json({
            message: 'eXceed vote will be closed in',
            round: 'document',
            remain_time: new Date("2016-07-29T12:00:00")
        });
    });
};
