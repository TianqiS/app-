const md5 = require('md5');

exports.md5 = function(password) {
    return md5(password);
};
