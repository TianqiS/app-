const dbConfig = require('./config');
const mongoose = require('mongoose');
const DBUrl = 'mongodb://' + dbConfig.db.host + '/' + dbConfig.db.dbName;

mongoose.connect(DBUrl);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DBUrl);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
