const router = require('koa-router') ({
    prefix: '/admin'
});
const koaBody = require('koa-body');
const adminModule = require('../module/admin');
const articleModule = require('../module/article');
const typeModule = require('../module/type');
const _ = require('lodash');
const utils = require('../utils/utils');
const qiniu = require('../utils/qiniu');

router.post('/addUser', async function(ctx) {
    let info = _.pick(ctx.request.body, ['userName', 'password']);

    await adminModule.addUser(info);
    ctx.body = 'success';
});

router.post('/addArticleType', async function(ctx) {
    let typeInfo = _.pick(ctx.request.body, ['articleType', 'detail', 'picUrl']);

    await articleModule.addArticleType(typeInfo);

    ctx.body = 'add success';
});

router.post('/addArticle', async function (ctx) {
    let articleInfo = _.pick(ctx.request.body, ['title', 'context', 'type', 'template']);

    await articleModule.addArticle(articleInfo);

    ctx.body = 'add article success';
});

router.post('/updateArticle', async function (ctx) {
    let articleId = ctx.request.body.articleId;
    let articleInfo = _.pick(ctx.request.body, ['title', 'context', 'type', 'template']);

    await articleModule.updateArticle(articleId, articleInfo);

    ctx.body = 'modify success';
});

router.post('/deleteArticle', async function (ctx) {
    let articleId = ctx.request.body.articleId;

    await articleModule.deleteArticle(articleId);

    ctx.body = 'delete success';
});

router.post('/deletePlate', async function(ctx) {
    let plateId = ctx.request.body.plateId;
    await typeModule.deletePlate(plateId);

    ctx.body = 'delete success';
});

router.post('/updatePlate', async function(ctx) {
    let plateId = ctx.request.body.plateId;
    let plateInfo = _.pick(ctx.request.body, ['article_type', 'detail', 'pic_url']);

    await typeModule.updatePlate(plateId, plateInfo);

    ctx.body = 'update success';
});

router.post('/upload',koaBody({multipart: true}), async function(ctx) {
    let file = ctx.request.body.files.file;
    let result = await qiniu.qiniuUpload(file.path);

    ctx.body = result;
});


module.exports = router;
