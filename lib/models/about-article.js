const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: '#'
    },
    text: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: '#'
    },
    visible: {
        type: Boolean,
        default: true
    },
    position: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('About', schema);