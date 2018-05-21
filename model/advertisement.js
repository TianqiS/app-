const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const advertisement = new Schema({
    attachment_list: {
        type: [Number]
    }
});

module.exports = advertisement;