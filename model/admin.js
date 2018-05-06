let mongoose = require('../utils/db');
let Schema = mongoose.Schema;

let admin = new Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin', admin);
