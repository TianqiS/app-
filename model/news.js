let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let news = new Schema({
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
});

module.exports = news