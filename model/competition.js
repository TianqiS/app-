let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let competition = new Schema({
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

module.exports = mongoose.model('competition', competition);