var JwtStrategy = require('passport-jwt').Strategy;

var User = require('../app/models/user');
var config = require('./config/database');

module.exports = (passport) => {
    var options = {};
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findOne({
            id: jwt_payload.id
        }, (error, user) => {
            if(error) return done(error, false);
            if(user) done(null, user);
            else done(null, false);
        });
    }));
};
