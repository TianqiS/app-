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

let formatDateTime = function (inputTime) {
    let date = new Date(inputTime);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

exports.addArticleType = function (typeInfo) {
    return typeModel.insertValue({
        article_type: typeInfo.articleType,
        detail: typeInfo.detail,
        pic_url: typeInfo.picUrl
    })
};

exports.addArticle = function (articleInfo) {

    return articleModel.insertValue({
        title: articleInfo.title,
        context: articleInfo.context,
        type: articleInfo.type,
        create_time: formatDateTime(new Date())
    }).then(result => {
        let typeModel = templateMap[articleInfo.type];
        result.template = new typeModel(articleInfo.template);
        result.save();
    })
};

exports.updateArticle = function (id, query) {
    return articleModel.findOne({_id: id}).then(result => {
        let typeModel = templateMap[query.type];
        Object.assign(result, query);
        result.template = new typeModel(query.template);
        result.update_time = new Date();

        result.save();
    })
};

exports.deleteArticle = function (articleId) {
    return articleModel.remove({
        _id: articleId
    })
};

exports.getArticleList = function (articleType, pageInfo) {
    let page = pageInfo.page || 1;
    let perPage = pageInfo.perPage || 10;
    let pageNumber = (page - 1) * perPage;

    return articleModel.find({
        type: articleType
    }).skip(pageNumber).limit(perPage);
};

exports.getOneArticle = function (articleId) {
    return articleModel.findOne({
        _id: articleId
    })
};

exports.searchArticle = function (keyword, time) {
    let wordReg = new RegExp(keyword, 'i');
    let timeReg = new RegExp(time, 'i');
    return articleModel.find({
        create_time: {$regex: timeReg},
        $or: [
            {
                title: {$regex: wordReg}
            },
            {
                context: {$regex: wordReg}
            }
        ]
    })
};

