const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: String,
    text: String,
    link: {
        type: String
    }
});

module.exports = mongoose.model('Article', schema);