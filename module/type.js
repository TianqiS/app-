const typeModel = require('../model/type');

exports.getTypeList = function() {
    let typeList = [];
    return typeModel.find({}).then(result => {
        result.forEach((e, i) => {
            if(i != 0) {
                e = e.toObject();
                delete e.__v;
                typeList.push(e);
            }
        });
        return typeList;
    })
};