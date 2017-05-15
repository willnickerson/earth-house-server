const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Article', schema);