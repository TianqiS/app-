const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const recruit = new Schema({
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    people: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

module.exports = recruit;