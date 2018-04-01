
let Model = function (table) {
    this.tb = table;
};

Model.prototype.table = function (db) {
    return db.from(this.tb);
};

Model.prototype.get = function (db, query) {
    return this.table(db).where(query);
};

Model.prototype.raw = function (db, string) {
    return db.raw(string);
};

Model.prototype.put = function (table,query ) {
    return table.insert(query);
}


    

module.exports = Model;