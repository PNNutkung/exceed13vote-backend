var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./project');

var CheckVoteSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    project: {
        type: Schema.ObjectId,
        ref: 'Project',
        required: true
    },
    best_of_hardware: {
        type: Boolean,
        required: true,
        default: true
    },
    best_of_software: {
        type: Boolean,
        required: true,
        default: true
    },
    popular: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('CheckVote', CheckVoteSchema);
