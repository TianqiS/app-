let adminModel = require('../model/admin');
let typeModel = require('../model/type');
let articleModel = require('../model/article');

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
        article_type: typeInfo.articleInfo,
        detail: typeInfo.detail
    })
};

exports.addArticle = function(articleInfo) {
    return articleModel.create({
        title: articleInfo.title,
        context: articleInfo.context,
        type: articleInfo.type,
        template: articleInfo.template,
        create_time: new Date()
    })
}


