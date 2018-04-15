let dbConfig = require('./config');
let db = require('knex')({
    client: 'mysql',
    connection: dbConfig.config.connection,
    pool: dbConfig.config.pool,
    acquireConnectionTimeout: dbConfig.config.acquireConnectionTimeout
});

module.exports = db;
