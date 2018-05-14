const adminModel = require('../model/admin');


exports.getUserInfo = function(userName) {
    return adminModel.find({user_name: userName})
};

exports.addUser = function(info) {
    return adminModel.create({
        user_name: info.userName,
        password: info.password
    })
};

