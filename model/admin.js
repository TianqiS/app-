let Model = require('../utils/model');
let adminModel = new Model('admin');

adminModel.getInfo = function(db, userName) {
    return adminModel.get(db, {
        username: userName
    })
};

module.exports = adminModel;