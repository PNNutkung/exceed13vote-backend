var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Group = require('./group');

var ProjectSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        unique: true,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
