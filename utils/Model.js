const mongoose = require('./db');

function nextval(id, model) {
    return model.findOneAndUpdate(
        {_id: id},
        {$inc: {seq: 1}},
        {
            new: true,
            upsert: true
        }
    ).then(result => {
        return result.seq;
    })
}

let Model = function (typeName, schemaName) {
    this.typeName = typeName;
    this.schemaName = schemaName;
};

Model.prototype.getModel = function () {
    this.schemaName.statics.insertValue = function (query) {
        query = (typeof query == "object") ? query : {};
        return nextval(0, this).then(seq => {
            query._id = seq;
            return this.create(query)
        });
    };
    return mongoose.model(this.typeName, this.schemaName);
};


module.exports = Model;

