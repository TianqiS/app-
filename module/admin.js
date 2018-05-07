const adminModel = require('../model/admin');
const typeModel = require('../model/type');
const articleModel = require('../model/article');
const template = require('../model/template');

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
    return typeModel.create({
        article_type: typeInfo.articleType,
        detail: typeInfo.detail
    })
};

exports.addArticle = function(articleInfo) {
    let templateMap = {
        "1": template.advertisementModel,
        "2": template.competitionModel,
        "3": template.lectureModel,
        "4": template.newsModel,
        "5": template.recruitModel
    };
    return articleModel.create({
        title: articleInfo.title,
        context: articleInfo.context,
        type: articleInfo.type,
        create_time: new Date()
    }).then(result => {
        let typeModel = templateMap[articleInfo.type]
        result.template = new typeModel(articleInfo.template);
        result.save();
    })
};


