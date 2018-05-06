let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let advertisement = new Schema({
    attachment_list: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = advertisement;