let Model = require('../utils/model');
let compModel = new Model('competiton');

compModel.getInfo = function(db, title) {
    return adminModel.get(db, {
        title: title
    })
};

compModel.getInfo = function(db, title) {
    return adminModel.put(db, {
        title: title
    })
};
module.exports = compModel;