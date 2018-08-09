const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const lecture = new Schema({
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
    }
});

module.exports = lecture;