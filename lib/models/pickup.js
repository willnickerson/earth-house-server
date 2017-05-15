const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    show: {
        type: Boolean,
        default: true
    },
    imgUrl: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        required: true
    },
    isFarmersMarket: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Pickup', schema);