var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    best_hardware: {
        type: Number
    },
    best_software: {
        type: Number
    },
    popular_vote: {
        type: Number
    },
    top_rated: {
        type: Number
    }
});

module.exports = mongoose.model('Vote', VoteSchema);
