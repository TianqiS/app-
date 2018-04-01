let adminModel = require('../model/admin');

exports.getUserInfo = function(userName) {
    return adminModel.getInfo(db, userName).first();
}


