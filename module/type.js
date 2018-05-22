const typeModel = require('../model/type');
const attachmentModel = require('../model/attachment');

function replaceUrl(originObject) {
    originObject = originObject.toObject();
    return attachmentModel.findOne({_id: originObject.pic_url}).then(attachment => {
        originObject.pic_url = attachment.attachment_url;
        return originObject;
    })
}

exports.getTypeList = function() {
    let promiseList = [];
    return new Promise(function(resolve, reject) {
        return typeModel.find({}).then(result => {
            result.forEach((e, i) => {
                if(i != 0) {
                    promiseList.push(replaceUrl(e));
                }
            });
            return Promise.all(promiseList).then(result => {
                resolve(result);
            })
        })
    });

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
    }).then(plate => {
        return replaceUrl(plate);
    })
};