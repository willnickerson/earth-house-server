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
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 5.00
    }
    //TODO add ingredients as part of the schema with a id ref to the ingredient model
});

module.exports = mongoose.model('Juice', schema);