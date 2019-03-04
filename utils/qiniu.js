const qiniu = require('qiniu');
const config = require('../utils/config');
const filetype = require('file-type');
const readChunk = require('read-chunk');

let getUploadToken = function(filePath) {
    qiniu.conf.ACCESS_KEY = config.qiniu.AccessKey;
    qiniu.conf.SECRET_KEY = config.qiniu.SecretKey;
    let mac = qiniu.auth.digest.Mac();
    let bucket = config.qiniu.bucket;
    let buffer = readChunk.sync(filePath, 0, 4100);
    // let isImg = '';
    let type = filetype(buffer);
    // if(type.ext === "gif" || type.ext === "png" || type.ext === "jpg") isImg = '?imageView2/0/format/jpg/q/75|imageslim'
    let options = {
        scope: bucket,
        returnBody: `{"url": "http://hduinmnt.qiniu.hduin.club/$(key)", "key": "$(key)"}`
    };
    let putpolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putpolicy.uploadToken(mac);

    return uploadToken;
};


module.exports = {
    qiniuUpload: function (filePath, fileName) {
        let formUploader = new qiniu.form_up.FormUploader(new qiniu.conf.Config());
        let extra = new qiniu.form_up.PutExtra();
        let uploadToken = getUploadToken(filePath);
        return new Promise(function(resolve, reject) {
            formUploader.putFile(uploadToken, fileName, filePath, extra, function(err, ret) {
                if(err) throw err;
                resolve(ret);
            })
        })
    }
};