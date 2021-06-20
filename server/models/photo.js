const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PhotoSchema = Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fileName: String
})

module.exports = mongoose.model('Photo', PhotoSchema);