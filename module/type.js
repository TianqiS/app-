const typeModel = require('../model/type');
const attachmentModel = require('../model/attachment');

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
    return typeModel.findOne({
        _id: plateId
    }).then(result => {
        return attachmentModel.remove({_id: result.pic_url}).then(() => {
            result.remove();
        })
    })
};

exports.updatePlate = function(plateId, plateInfo) {
    return typeModel.findOne({
        _id: plateId
    }).then(result => {
        return attachmentModel.findOne({_id: result.pic_url}).then(attachment => {
            if(plateInfo.pic_url) return attachment.remove();
        }).then(() => {
            Object.assign(result, plateInfo);
            result.save();
        })

    })
};

exports.getOnePlate = function(plateId) {
    return typeModel.findOne({
        _id: plateId
    })
};