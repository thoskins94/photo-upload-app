const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PhotoSchema = Schema({
    dateUploaded: Date,
    src: String,
    alt: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Photo', PhotoSchema);