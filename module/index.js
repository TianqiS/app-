const indexModel = require('../model/index');

exports.addIndex = function (article_id) {
    return indexModel.insertValue({
        "article_id": article_id
    }).catch(err => {
        if (err) throw 40003;
    })
};

exports.deleteIndex = function (article_id) {
    return indexModel.findOne({
        "article_id": article_id
    }).then(result => {
        return indexModel.remove({"article_id": result. article_id}).then(()=> {
            result.remove();
        }).catch(err => {
            if (err) throw 40003;
        })
    })
};

exports.getIndex = function (pageInfo) {
    let page = pageInfo.page * 1|| 1;
    let perPage = pageInfo.perPage * 1 || 10;
    let pageNumber = (page - 1) * perPage;
    return indexModel.find({
        article_id: {$ne: null}
    }).skip(pageNumber).limit(perPage).populate('article_id').catch(err => {
        if (err) throw 40003;
    });
};