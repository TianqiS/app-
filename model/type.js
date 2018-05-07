const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const type = new Schema({
    type_id: {
        type: Number
    },
    article_type: {
        type: String
    },
    detail: {
        type: String
    }
});

module.exports = mongoose.model('type', type);