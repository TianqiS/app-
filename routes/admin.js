const router = require('koa-router') ({
    prefix: '/admin'
});
const adminModule = require('../module/admin');
const articleModule = require('../module/article')
const _ = require('lodash');

router.post('/addUser', async function(ctx) {
    let info = _.pick(ctx.request.body, ['userName', 'password']);

    await adminModule.addUser(info);
    ctx.body = 'success';
});

router.post('/addArticleType', async function(ctx) {
    let typeInfo = _.pick(ctx.request.body, ['articleType', 'detail']);

    await articleModule.addArticleType(typeInfo)

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



module.exports = router;
