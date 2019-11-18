"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let connectionURL;
let dbName;
async function getDB(connectURL, databaseName) {
    if (connectURL && databaseName) {
        connectionURL = connectURL;
        dbName = databaseName;
        await mongoose.connect(connectURL, {
            dbName: databaseName,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    return mongoose.connection.db;
}
exports.getDB = getDB;
//# sourceMappingURL=getDB.js.map