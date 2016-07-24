var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    project: {
        type: String,
        unique: true,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
