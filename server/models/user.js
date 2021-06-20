const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require: true
    },
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }],
    access_token: {
        type: String
    },
    expires_in: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema);