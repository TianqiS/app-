const { randomBytes } = require('crypto');
const schema = {
    _id: String,
    data: Object,
    updatedAt: {
        default: new Date(),
        expires: 86400, // 1 day
        type: Date
    }
};


class MongooseStore {
    constructor({
                    connection = null,
                    expires = 86400,
                    name = 'Session'
                } = {}) {
        if (!connection) {
            throw new Error('params connection is not collection');
        }
        const updatedAt = {...schema.updatedAt, expires};
        this.session = connection.model(name, new connection.Schema({...schema, updatedAt}));
    }

    async destroy(id, ctx) {
        const {session} = this;
        return session.remove({_id: id});
    }

    async get(id, ctx) {
        const {session} = this;
        const {data} = await session.findById(id);
        return data;
    }

    async set(data, {sid = this.getID(24)} = {}, ctx) {
        const {session} = this;
        const record = {_id: sid, data, updatedAt: new Date()};
        await session.findByIdAndUpdate(sid, record, {upsert: true, safe: true}).catch(err => {
            console.log(err);
        });
        return sid;
    }

    getID(length) {
        return randomBytes(length).toString('hex');
    }
}

module.exports = MongooseStore;
