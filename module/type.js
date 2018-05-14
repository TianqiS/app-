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

exports.deletePlate = function(plateId) {
    return typeModel.remove({
        _id: plateId
    })
};

exports.updatePlate = function(plateId, plateInfo) {
    return typeModel.findOne({
        _id: plateId
    }).then(result => {
        Object.assign(result, plateInfo);
        console.log(result);
        result.save();
    })
};