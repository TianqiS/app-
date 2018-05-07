const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const advertisement = require('./advertisement');
const competition = require('./competition');
const lecture = require('./lecture');
const news = require('./news');
const recruit = require('./recruit');

let typeModel = new Schema({}, {discriminatorKey: 'templateType'})

let template = new Schema({
    type: typeModel
});

exports.advertisementModel = template.path('type').discriminator('advertisement', advertisement);
exports.competitionModel = template.path('type').discriminator('competition', competition);
exports.lectureModel = template.path('type').discriminator('lecture', lecture);
exports.newsModel = template.path('type').discriminator('news', news);
exports.recruitModel = template.path('type').discriminator('recruit', recruit);
exports.templateModel = template;

