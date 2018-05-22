const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const advertisement = new Schema({
    attachment_list: {
        type: [Number],
        ref: 'attachment'
    }
});

module.exports = advertisement;