const typeModel = require('../model/type');
const articleModel = require('../model/article');
const template = require('../model/template');
const attachmentModel = require('../model/attachment');

const templateMap = {
    "1": template.advertisementModel,
    "2": template.competitionModel,
    "3": template.lectureModel,
    "4": template.newsModel,
    "5": template.recruitModel,
    "6": template.wechatModel
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
        pic_url: typeInfo.pic_url
    }).catch(err => {
        console.log(err);
        if (err) throw 40003;
    })
};

exports.addArticle = function (articleInfo) {
    return articleModel.insertValue({
        title: articleInfo.title,
        context: articleInfo.context,
        type: articleInfo.type,
        create_time: formatDateTime(new Date()),
        pic_url: articleInfo.pic_url
    }).then(result => {
        let typeModel = templateMap[articleInfo.type];
        result.template =  {};
        if(!!typeModel) {
            result.template = new typeModel(articleInfo.template);
        }
        result.save();
        return result._id;
    }).catch(err => {
        if (err) throw 40003;
    })
};

exports.updateArticle = function (query) {
    return articleModel.findOne({_id: query.articleId}).then(result => {
        return attachmentModel.findOne({_id: result.pic_url}).then(attachment => {
            if (query.pic_url && attachment && query.pic_url != attachment._id) {
                return attachment.remove();
            }
        }).then(() => {
            let typeModel = templateMap[query.type];
            Object.assign(result, query);
            result.template = new typeModel(query.template);
            result.update_time = new Date();
            result.save();
            return result._id;
        }).catch(err => {
            if (err) throw 40003;
        })
    })
};

exports.deleteArticle = function (articleId) {
    return articleModel.findOne({
        _id: articleId
    }).then(result => {
        return attachmentModel.remove({_id: result. pic_url}).then(()=> {
            result.remove();
        }).catch(err => {
            if (err) throw 40003;
        })
    })
};

exports.getArticleList = function (articleType, pageInfo) {
    let page = pageInfo.page * 1|| 1;
    let perPage = pageInfo.perPage * 1 || 10;
    let pageNumber = (page - 1) * perPage;


    return articleModel.find({
        type: articleType
    }).sort({'_id': -1}).populate('pic_url', 'attachment_url').skip(pageNumber).limit(perPage).populate({
        path: 'template.attachment_list',
        model: 'attachment'
    }).populate({
        path: 'template.attach_id',
        model: 'attachment'
    })
};

exports.getOneArticle = function (articleId) {
    return articleModel.findOneAndUpdate({
        _id: articleId
    }, {
        $inc: {"readingVolume": 1}
    }).populate('pic_url', 'attachment_url').populate({
        path: 'template.attachment_list',
        model: 'attachment'
    }).populate({
        path: 'template.attach_id',
        model: 'attachment'
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
    }).populate('pic_url', 'attachment_url');
};

