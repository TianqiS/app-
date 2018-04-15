let router = require('koa-router') ({
    prefix: '/common'
});
let _ = require('lodash');
let adminModule = require('../module/admin');
let md5 = require(('../utils/utils'));
/**
 * 登陆
 * 参数：userName, password
 */
router.post('/login', async function (ctx) {
    let info = _.pick(ctx.request.body, ['username', 'password']);

    let userInfo = await adminModule.getUserInfo(info.username);

    let real_password = md5(info.password);

    if(real_password != userInfo.password) throw new Error('用户名密码错误');



    ctx.body={
        status: 'success',
        message: '登录成功',
        session: ctx.session,
    }
    });



module.exports = router;
