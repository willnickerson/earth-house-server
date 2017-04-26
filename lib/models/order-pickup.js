const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pickup: {
        type: Schema.Types.ObjectId,
        ref: 'Pickup',
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
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
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('OrderPickup', schema);