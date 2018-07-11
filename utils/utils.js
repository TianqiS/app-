const md5 = require('md5');
const errorList = require('../error.json');

exports.md5 = function (password) {
    return md5(password);
};

exports.errHandle = async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        if (typeof err === 'number') {
            if ((err + '').length === 3) ctx.status = err;
            else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    msg: errorList[err] //errorList.error
                };
            }
        } else {
              ctx.status = 403;
              ctx.body = {
                  status: 'error',
                  msg: errorList[40004]
              }
        }
    }
};

exports.isLogin = async function (ctx, next) {
    var str = ctx.request.url;
    str = str.match(/\/(\S*)\//)[1];
    if (str === "admin") {
        // 判断是否有session
        if (ctx.session.type === 'admin') {
            await next();
        }
        else {
            ctx.redirect('../common/login')
        }
    } else {
        await next();
    }
};