let env = process.env;
let config = {
    db:{
        host: env.HOST || 'localhost',
        dbName: env.DBNAME || 'management'
    },
};

module.exports = config;
