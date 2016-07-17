var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Group = require('./group');
var User = require('./user');

var VoteSchema = new Schema({
    vote_user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    vote_category: {
        type: String
    },
    group: {
        type: Schema.ObjectId,
        ref: 'Group'
    },
    score: {
        type: Number
    }
});

module.exports = mongoose.model('Vote', VoteSchema);
