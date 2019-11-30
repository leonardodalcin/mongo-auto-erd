"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDB_1 = require("./getDB");
async function getCollectionByName(collectionName) {
    return (await getDB_1.getDB()).collection(collectionName);
}
exports.getCollectionByName = getCollectionByName;
//# sourceMappingURL=getCollectionByName.js.map