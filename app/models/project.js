var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    contents: {

    },
    vote_id: {
        type: String
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
