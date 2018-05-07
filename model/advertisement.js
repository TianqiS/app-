const mongoose = require('../utils/db');
const Schema = mongoose.Schema;

const advertisement = new Schema({
    attachment_list: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = advertisement;