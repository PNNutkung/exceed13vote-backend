var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    group_name: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Group', GroupSchema);
