const router = require('koa-router') ({
    prefix: '/admin'
});
const koaBody = require('koa-body');
const adminModule = require('../module/admin');
const articleModule = require('../module/article');
const typeModule = require('../module/type');
const _ = require('lodash');
const Joi = require('joi');
const attachmentModule = require('../module/attachment');

router.post('/addUser', async function(ctx) {
    let info = _.pick(ctx.request.body, ['userName', 'password']);

    let schema = {
        username : Joi.string().alphanum().min(3).max(30).required(),
        password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    };

    Joi.validate(info, schema, function(err) {
        if(err) throw 40001;
    });

    await adminModule.addUser(info);
    ctx.body = 'success';
});

router.post('/addArticleType', async function(ctx) {
    let typeInfo = _.pick(ctx.request.body, ['articleType', 'detail', 'pic_url']);

    let schema = {
        articleType: Joi.string(),
        detail: Joi.string(),
        pic_url: Joi.string()
    };

    Joi.validate(typeInfo, schema, function(err) {
        if(err) throw 40001;
    });

    await articleModule.addArticleType(typeInfo);
    ctx.body = 'add success';
});


router.post('/addArticle', async function (ctx) {
    let articleInfo = _.pick(ctx.request.body, ['title', 'context', 'type', 'template', 'pic_url', 'isIndex']);
    let schema = {
        title: Joi.string(),
        context: Joi.string(),
        type: Joi.number(),
        template: Joi.object(),
        pic_url: Joi.string().allow(""),
        isIndex: Joi.boolean()
    };
    Joi.validate(articleInfo, schema, function(err) {
        if(err) throw 40001;
    });
    let newArticleId = await articleModule.addArticle(articleInfo);

    return ctx.body = newArticleId;

});

router.post('/updateArticle', async function (ctx) {

    let articleInfo = _.pick(ctx.request.body, ['articleId', 'title', 'context', 'type', 'template', 'pic_url', 'isIndex']);

    let schema = {
        articleId: Joi.number(),
        title: Joi.string(),
        context: Joi.string(),
        type: Joi.number(),
        template: Joi.object(),
        pic_url: Joi.string().allow(""),
        isIndex: Joi.boolean()
    };

    Joi.validate(articleInfo, schema, function(err) {
        if(err) throw 40001;
    });
    let article_id = await articleModule.updateArticle(articleInfo);
    ctx.body = article_id;
});

router.post('/deleteArticle', async function (ctx) {
    let articleId = ctx.request.body.articleId;

    let schema ={
        articleId : Joi.number(),
    };

    Joi.validate({"articleId":articleId}, schema, function(err) {
        if(err) throw 40001;
    });

    await articleModule.deleteArticle(articleId);

    ctx.body = 'delete success';
});

router.post('/deletePlate', async function(ctx) {
    let plateId = ctx.request.body.plateId;
    let schema ={
        plateId : Joi.number(),
    };
    Joi.validate({"plateId":plateId}, schema, function(err) {
        if(err) throw 40001;
    });
    await typeModule.deletePlate(plateId);

    ctx.body = 'delete success';
});

router.post('/updatePlate', async function(ctx) {
    let plateId = ctx.request.body.plateId;
    let plateInfo = _.pick(ctx.request.body, ['plateId', 'article_type', 'pic_url']);

    let schema = {
        plateId: Joi.number(),
        article_type: Joi.string(),
        pic_url: Joi.number(),
    };

    Joi.validate(plateInfo, schema, function(err) {
        if(err) throw 40001;
    });

    await typeModule.updatePlate(plateInfo);

    ctx.body = 'update success';
});

router.post('/upload',koaBody({multipart: true}), async function(ctx) {
    let file = ctx.request.body.files.file;
    let fileName = file.name;
    let result = await attachmentModule.uploadAttachment(file.path, fileName);

    ctx.body = result;
});

module.exports = router;
