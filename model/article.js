const mongoose = require('../utils/db');
const template = require('./template');
const Schema = mongoose.Schema;
const Model = require('../utils/Model');

const article = new Schema({
    _id: {
        type: Number
    },
    seq: {
        type: Number
    },
    title: {
        type: String
    },
    context: {
        type: String
    },
    type: {
        type: Number,
        min: 1,
        max: 6
    },
    template: template.templateModel,
    create_time: {
        type: Date,
        required: true
    },
    update_time: {
        type: Date
    }
});

module.exports = new Model('article', article).getModel();