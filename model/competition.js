const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const competition = new Schema({
    start_time: {
        type: String,
        required: true
    },
    final_time: {
        type: String,
        required: true
    },
    attach_id: {
        type: [String]
    },
    qualification: {
        type: String,
        required: true
    },
    arrangement: {
        type: String,
        required: true
    }
});

module.exports = competition;