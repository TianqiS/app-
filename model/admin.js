const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const admin = new Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin', admin);
