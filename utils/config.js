const env = process.env;
const config = {
    db:{
        host: env.HOST || 'localhost',
        dbName: env.DBNAME || 'management'
    },
    qiniu: {
        AccessKey: 'S-o2TXJLofPqx4bN6FoaJQQ7JDvzlbQfQ3B1kQ-t',
        SecretKey: 'bgp3iOArRGS6yevsoky72eWrBqHVHg3MtlEWV1uB',
        bucket: 'hduin-management'
    }
};

module.exports = config;
