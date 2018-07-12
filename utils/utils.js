const md5 = require('md5');
const errorList = require('../error.json');
const koaSession = require("koa-session2");
const sessionStore = require('./sessionStore');
const mongoose = require('./db');
const sessionStoreInstance = new sessionStore({
    connection: mongoose,     // 数据库链接实例
    expires: 86400, // 默认时间为1天
    name: 'session' // 保存session的表名称
});


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
                ctx.status = 403;
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

exports.session = function() {
    return koaSession({
        key: 'koa:sess',
        maxAge: 86400000,
        store: sessionStoreInstance
    })
};