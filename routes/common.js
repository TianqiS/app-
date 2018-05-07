const router = require('koa-router')({
    prefix: '/common'
});
const _ = require('lodash');
const adminModule = require('../module/admin');
const md5 = require(('../utils/utils'));
// let Joi = require('joi')
/**
 * 登陆
 * 参数：userName, password
 */
router.post('/login', async function (ctx) {
    let info = _.pick(ctx.request.body, ['userName', 'password']);

    let userInfo = await adminModule.getUserInfo(info.username);

    let real_password = md5(info.password);

    if (real_password != userInfo.password) throw new Error('用户名密码错误');

    ctx.body = {
        status: 'success',
        message: '登录成功',
        session: ctx.session,
    }
});

router.get('/postArticle', async function(ctx) {

});
module.exports = router;
