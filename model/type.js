const mongoose = require('../utils/db');
const Schema = mongoose.Schema;
const Model = require('../utils/Model');

const type = new Schema({
    _id: {
        type: Number
    },
    seq: {
        type: Number
    },
    article_type: {
        type: String
    },
    detail: {
        type: String
    }
});

module.exports = new Model('type', type).getModel();