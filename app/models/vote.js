var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./project');
var User = require('./user');

var VoteSchema = new Schema({
    vote_user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    vote_category: {
        type: String
    },
    project: {
        type: Schema.ObjectId,
        ref: 'Project'
    },
    score: {
        type: Number
    }
});

module.exports = mongoose.model('Vote', VoteSchema);
