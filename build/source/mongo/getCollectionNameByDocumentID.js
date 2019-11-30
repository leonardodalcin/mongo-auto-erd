"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCollectionByName_1 = require("@mongo/getCollectionByName");
const getDBCollectionNames_1 = require("@mongo/getDBCollectionNames");
async function isIDInCollection(id, collectionName) {
    const collection = await getCollectionByName_1.getCollectionByName(collectionName);
    return !!(await collection.findOne({ _id: id }));
}
async function getCollectionNameByDocumentID(id) {
    const collectionNames = await getDBCollectionNames_1.getDBCollectionNames();
    const responses = await Promise.all(collectionNames.map(async (name) => {
        if (await isIDInCollection(id, name)) {
            return name;
        }
        else {
            return null;
        }
    }));
    return responses.find((name) => name !== null);
}
exports.getCollectionNameByDocumentID = getCollectionNameByDocumentID;
//# sourceMappingURL=getCollectionNameByDocumentID.js.map