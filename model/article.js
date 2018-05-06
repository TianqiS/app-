let mongoose = require('../utils/db');
let template = require('./template');
let Schema = mongoose.Schema;

let article = new Schema({
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
    template: [news, lecture],
    create_time: {
        type: Date,
        required: true
    },
    update_time: {
        type: Date
    }
});

module.exports = mongoose.model('article', article);