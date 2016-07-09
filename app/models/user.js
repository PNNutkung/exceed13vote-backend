var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.pre('save', (next) => {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.getSalt(12, (error, salt) => {
            if (error) return next(error);
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = (password, callback) => {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        if(error) return callback(error);
        callback(null, isMatch);
    });
};
