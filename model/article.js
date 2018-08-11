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
    readingVolume: {
        default: 0,
        type: Number,
    },
    template: template.templateModel,
    create_time: {
        type: String,
        required: true
    },
    update_time: {
        type: Date
    },
    pic_url: {
        type: Number,
        ref: 'attachment'
    },
    isIndex: {
        type: Boolean,
        default: false
    }
});

module.exports = new Model('article', article).getModel();