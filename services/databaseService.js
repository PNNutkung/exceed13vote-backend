module.exports = (app, mongoose, passport, config, express, jwt, bodyParser, User) => {
    mongoose.connect(config.database);
    require('../config/passport')(passport);

    // bundle our routes
    var apiRoutes = express.Router();

    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/signup', (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({
                success: false,
                msg: 'Please pass name and password.'
            });
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            // save the user
            newUser.save((err) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        msg: 'Username already exists.'
                    });
                }
                res.json({
                    success: true,
                    msg: 'Successful created new user.'
                });
            });
        }
    });

    // connect the api routes under /api/*
    app.use('/api', apiRoutes);
}
