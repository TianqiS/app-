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
    attachment_list: {
        type: [Number],
        ref: 'attachment'
    }
});

module.exports = competition;