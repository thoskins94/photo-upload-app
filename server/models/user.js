const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }]
})

module.exports = mongoose.model('User', UserSchema);