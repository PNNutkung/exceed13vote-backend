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
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        unique: true,
        required: true
    },
    content: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
