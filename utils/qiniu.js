const qiniu = require('qiniu');
const config = require('../utils/config');

let getUploadToken = function() {
    qiniu.conf.ACCESS_KEY = config.qiniu.AccessKey;
    qiniu.conf.SECRET_KEY = config.qiniu.SecretKey;
    let mac = qiniu.auth.digest.Mac();
    let bucket = config.qiniu.bucket;
    let options = {
        scope: bucket,
        returnBody: '{"url": "http://p8s2ad26k.bkt.clouddn.com/$(key)?imageView2/0/format/jpg/q/75|imageslim", "key": "$(key)"}'
    };
    let putpolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putpolicy.uploadToken(mac);

    return uploadToken;
};


module.exports = {
    qiniuUpload: function (filePath) {
        let formUploader = new qiniu.form_up.FormUploader(new qiniu.conf.Config());
        let extra = new qiniu.form_up.PutExtra();
        let uploadToken = getUploadToken();
        return new Promise(function(resolve, reject) {
            formUploader.putFile(uploadToken, null, filePath, extra, function(err, ret) {
                if(err) throw err;
                resolve(ret);
            })
        })
    }
};