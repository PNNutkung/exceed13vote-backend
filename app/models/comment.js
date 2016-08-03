var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./project');

var CommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    project: {
        type: Schema.ObjectId,
        ref: 'Project',
        required: true
    },
    detail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
