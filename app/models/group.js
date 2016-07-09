var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    group_name: {
        type: String,
        unique: true,
        required: true
    },
    project_id : {
        type: Number
    }
});

module.exports = mongoose.model('Group', GroupSchema);
