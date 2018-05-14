const adminModel = require('../model/admin');
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

exports.getUserInfo = function(userName) {
    return adminModel.find({user_name: userName})
};

exports.addUser = function(info) {
    return adminModel.create({
        user_name: info.userName,
        password: info.password
    })
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
        for(let i in result) {
            result[i] = (query[i] != undefined)? query[i] : result[i];
        }
        result.template = new typeModel(query.template);

        result.save();
    })
};

exports.deleteArticle = function (articleId) {
    return articleModel.remove({
        _id: articleId
    })
};


