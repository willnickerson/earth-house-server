const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        line_1: {
            type: String,
            required: true
        },
        line_2: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    items: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', schema);

//potentially add more validation in here to insure that state, city, zip, etc are within delivery range