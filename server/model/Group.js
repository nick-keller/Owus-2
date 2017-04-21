var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var repository = require('../repository/groupRepository');

var GroupSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    picture: {
        type: String
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
}, { collection: 'user_group' });

GroupSchema.statics.findGroupsOfUser = repository.findGroupsOfUser;

mongoose.model('Group', GroupSchema);