const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const wechat = new Schema({
    url: {
        type: String,
        required: true
    }
});

module.exports = wechat;