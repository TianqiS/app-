var db = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'szq1999619',
        database : 'login'
    },
    pool: {
        min: 0,
        max: 7
    },//连接池
    acquireConnectionTimeout: 10000});//断线重连
module.exports = db;
