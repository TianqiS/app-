let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let recruit = new Schema({
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

module.exports = mongoose.model('recruit', recruit);