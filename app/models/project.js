var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        ref: 'Group'
    },
    contents: [
        {
            header: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            }
        }
    ],
    vote_id: {
        type: String
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
