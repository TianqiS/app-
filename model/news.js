const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const news = new Schema({
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