const typeModel = require('../model/type');
const attachmentModel = require('../model/attachment');

exports.getTypeList = function() {
    return typeModel.find({_id: {$ne: 0}}).populate('pic_url', 'attachment_url');
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

exports.updatePlate = function(plateInfo) {
    return typeModel.findOne({
        _id: plateInfo.plateId
    }).then(result => {
        return attachmentModel.findOne({_id: result.pic_url}).then(attachment => {
            if(plateInfo.pic_url && attachment && plateInfo.pic_url != attachment._id) return attachment.remove();
        }).then(() => {
            Object.assign(result, plateInfo);
            result.save();
        }).catch(err => {
            console.log(err)
        })

    })
};

exports.getOnePlate = function(plateId) {
    return typeModel.findOne({
        _id: plateId
    }).populate('pic_url', 'attachment_url')
};