const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    text: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        default: 'Check out our juices'
    }
});

module.exports = mongoose.model('shopContent', schema);