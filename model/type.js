let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let type = new Schema({
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