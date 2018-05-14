const router = require('koa-router')({
    prefix: '/common'
});
const _ = require('lodash');
const adminModule = require('../module/admin');
const articleModule = require('../module/article');
const typeModule = require('../module/type');
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

router.get('/articleList', async function (ctx) {
    let pageInfo = {};
    let articleType = ctx.query.articleType;
    pageInfo.page = ctx.query.page;
    pageInfo.perPage = ctx.query.perPage;

    let result = await articleModule.getArticleList(articleType, pageInfo);

    ctx.body = result;
});

router.get('/plateList', async function (ctx) {
    let result = await typeModule.getTypeList();

    ctx.body = result;
});

router.get('/getOnePlate', async function (ctx) {
    let plateId = ctx.request.query.plateId;
    let result = await typeModule.getOnePlate(plateId);

    console.log(result);
    ctx.body = result;
});

router.get('/getOneArticle', async function (ctx) {
    let articleId = ctx.request.query.articleId;

    let result = await articleModule.getOneArticle(articleId);

    ctx.body = result;
});


module.exports = router;
