const mongoose = require('../utils/db');
const template = require('./template');
const Schema = mongoose.Schema;

const article = new Schema({
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

module.exports = mongoose.model('article', article);