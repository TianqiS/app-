const router = require('koa-router')({
    prefix: '/common'
});
const _ = require('lodash');
const Joi = require('joi');
const Extension = require('joi-date-extensions');
const adminModule = require('../module/admin');
const articleModule = require('../module/article');
const typeModule = require('../module/type');
const utils = require('../utils/utils');
const JoiDate = Joi.extend(Extension);
/**
 * 登陆
 * 参数：userName, password
 */
router.post('/login', async function (ctx) {
    let info = _.pick(ctx.request.body, ['userName', 'password']);

    let schema = {
        userName : Joi.string().alphanum().min(3).max(30).required(),
        password : Joi.string().regex(/^[a-zA-Z0-9]*$/),
    };
    Joi.validate(info,schema,function (err) {
        if(err) throw 40001;
    });

    let userInfo = (await adminModule.getUserInfo(info.userName))[0];
    if(!userInfo) throw 40005;

    let password = utils.md5(info.password);

    if (password !== userInfo.password) throw 40002;
    ctx.body = {
        status: 'success',
        message: '登录成功',
        session: ctx.session,
    };
    ctx.session.type = 'admin'
});

router.get('/articleList', async function (ctx) {
    let pageInfo = {};
    let articleType = ctx.query.articleType;
    pageInfo.page = ctx.query.page;
    pageInfo.perPage = ctx.query.perPage;

    let schema = {
        articleType: Joi.number(),
        page: Joi.number(),
        perPage: Joi.number()
    };

    Joi.validate(Object.assign({"articleType": articleType}, pageInfo), schema, function(err) {
        if(err) throw 40001;
    });

    let result = await articleModule.getArticleList(articleType, pageInfo);

    ctx.body = result;
});

router.get('/plateList', async function (ctx) {
    let result = await typeModule.getTypeList();

    ctx.body = result;
});

router.get('/getOnePlate', async function (ctx) {
    let plateId = ctx.request.query.plateId;

    let schema = {
        plateId : Joi.number()
    };

    Joi.validate({"plateId": plateId}, schema, function (err) {
        if(err) throw 40001;
    });

    let result = await typeModule.getOnePlate(plateId);

    ctx.body = result;
});

router.get('/getOneArticle', async function (ctx) {
    let articleId = ctx.request.query.articleId;
    let schema = {
        articleId : Joi.number()
    };

    Joi.validate({"articleId":articleId}, schema, function (err) {
        if(err) throw 40001;
    });

    let result = await articleModule.getOneArticle(articleId);

    ctx.body = result;
});

router.get('/searchArticle', async function(ctx) {
    let keyword = ctx.request.query.keyword;
    let time = ctx.request.query.time;

    let schema = {
        keyword : JoiDate.string(),
        time :JoiDate.date().format('YYYY-MM-DD')
    };

    JoiDate.validate(ctx, schema, function (err) {
        if(err) throw 40001;
    });

    let article = await articleModule.searchArticle(keyword, time);

    ctx.body = article;
});

router.get('/getIndex', async function (ctx) {
    let pageInfo = {};
    pageInfo.page = ctx.query.page;
    pageInfo.perPage = ctx.query.perPage;

    let schema = {
        page: Joi.number(),
        perPage: Joi.number()
    };

    Joi.validate(pageInfo, schema, function(err) {
        if(err) throw 40001;
    });
    let result = await articleModule.getIndexArticle(pageInfo);

    ctx.body = result;
});

module.exports = router;
