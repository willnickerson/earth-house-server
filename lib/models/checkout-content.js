const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    text: {
        type: String,
        default: ''
    },
    pickupText: {
        type: String,
        default: ''
    },
    deliveryText: {
        type: String,
        default: ''
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('checkoutContent', schema);