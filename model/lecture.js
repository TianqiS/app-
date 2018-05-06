let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let lecture = new Schema({
    teacher: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

module.exports = lecture