const typeModel = require('../model/type');
const articleModel = require('../model/article');
const template = require('../model/template');
const templateMap = {
    "1": template.advertisementModel,
    "2": template.competitionModel,
    "3": template.lectureModel,
    "4": template.newsModel,
    "5": template.recruitModel
};

exports.addArticleType = function(typeInfo) {
    return typeModel.insertValue({
        article_type: typeInfo.articleType,
        detail: typeInfo.detail
    })
};

exports.addArticle = function(articleInfo) {

    return articleModel.insertValue({
        title: articleInfo.title,
        context: articleInfo.context,
        type: articleInfo.type,
        create_time: new Date()
    }).then(result => {
        let typeModel = templateMap[articleInfo.type];
        result.template = new typeModel(articleInfo.template);
        result.save();
    })
};

exports.updateArticle = function(id, query) {
    return articleModel.findOne({_id: id}).then(result => {
        let typeModel = templateMap[query.type];
        Object.assign(result, query);
        result.template = new typeModel(query.template);

        result.save();
    })
};

exports.deleteArticle = function (articleId) {
    return articleModel.remove({
        _id: articleId
    })
};

exports.getArticleList = function(articleType, pageInfo) {
    let page = pageInfo.page || 1;
    let perPage = pageInfo.perPage || 10;
    let pageNumber = (page - 1) * perPage;

    return articleModel.find({
        type: articleType
    }).skip(pageNumber).limit(perPage);
};


