let env = process.env;
let db = {
    config:{
        connection: {
            host : env.host || 'localhost',
            user : env.user || 'root',
            password : env.password || '',
            database : 'management'
        },
        pool: {
            min: env.min || 0,
            max: env.max || 7
        },
        acquireConnectionTimeout: env.connectionTime || 10000
    }
}
module.exports = db;
