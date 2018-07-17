const mongoose = require('../utils/db');
const Schema = mongoose.Schema;
const Model = require('../utils/Model');


const index = new Schema({
    _id: {
        type: Number
    },
    seq: {
        type: Number
    },
    article_id: {
        type: Number,
        ref: 'article'
    }

});

module.exports = new Model('index', index).getModel();