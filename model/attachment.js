const mongoose = require('../utils/db');
const Schema = mongoose.Schema;
const Model = require('../utils/Model');

const attachment = new Schema({
    _id: {
        type: Number
    },
    seq: {
        type: Number
    },
    key: {
        type: String
    },
    attachment_url: {
        type: String
    }
});

module.exports = new Model('attachment', attachment).getModel();