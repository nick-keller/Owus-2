var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    gender: {
        type: String
    },
    facebook_id: {
        type: String
    },
    picture: {
        type: String
    },
    access_token: {
        type: String
    }
});

mongoose.model('User', UserSchema);