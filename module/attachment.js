let attachmentModel = require('../model/attachment');
let qiniu = require('../utils/qiniu');

exports.uploadAttachment = function(filePath, fileName) {
    return qiniu.qiniuUpload(filePath, fileName).then(result => {
        return attachmentModel.insertValue({
            key: fileName,
            attachment_url: result.url
        })
    })
};

exports.getAttachment = function(attachmentId) {
    return attachmentModel.find({ _id: attachmentId });
}