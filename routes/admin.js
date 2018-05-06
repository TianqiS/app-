let router = require('koa-router') ({
    prefix: '/admin'
});
let adminModule = require('../module/admin');
let _ = require('lodash');

router.post('/addUser', async function(ctx) {
    let info = _.pick(ctx.request.body, ['userName', 'password']);

    await adminModule.addUser(info);
    ctx.body = 'success';
});

router.post('/addArticleType', async function(ctx) {
    let typeInfo = _.pick(ctx.request.body, ['articleType', 'detail']);

    await adminModule.addArticleType(typeInfo)

    ctx.body = 'add success';
});

router.post('/addArticle', async function (ctx) {
    let articleInfo = _.pick(ctx.request.body, ['title', 'context', 'type', 'template']);

    await adminModule.addArticle(articleInfo);

    ctx.body = 'add article success';
});



module.exports = router;
