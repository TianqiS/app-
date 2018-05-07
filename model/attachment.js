const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const attachment = new Schema({
    name: {
        type: String,
        required: true
    },
    attachment_url: {
        type: String
    }
});

module.exports = mongoose.model('attachment', attachment);