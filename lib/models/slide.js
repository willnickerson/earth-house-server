const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: '#'
    },
    show: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Slide', schema);