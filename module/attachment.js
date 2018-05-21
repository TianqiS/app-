let attachmentModel = require('../model/attachment');
let qiniu = require('../utils/qiniu');

exports.uploadAttachment = function(filePath) {
    return qiniu.qiniuUpload(filePath).then(result => {
        return attachmentModel.insertValue({
            key: result.key,
            attachment_url: result.url
        })
    })
};