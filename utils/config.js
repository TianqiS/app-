const env = process.env;
const config = {
    db:{
        host: env.HOST || 'localhost',
        dbName: env.DBNAME || 'management'
    },
};

module.exports = config;
