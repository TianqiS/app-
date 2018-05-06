let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let attachment = new Schema({
    name: {
        type: String,
        required: true
    },
    attachment_url: {
        type: String
    }
});

module.exports = mongoose.model('attachment', attachment);