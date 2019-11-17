"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDB_1 = require("@mongo/getDB");
// tslint:disable-next-line:max-line-length
async function mapReduceCollectionProperties(collectionName, limitDocs = 50) {
    const db = await getDB_1.getDB();
    const collection = await db.collection(collectionName);
    /* istanbul ignore next */
    const mapResult = (await collection.mapReduce(function () {
        // @ts-ignore
        // tslint:disable-next-line
        for (let key in this) {
            // @ts-ignore
            emit(key, this[key]);
        }
    }, function (key, values) {
        if (!Array.isArray(values)) {
            values = [values];
        }
        return {
            name: key,
            values
        };
    }, { out: { inline: 1 }, limit: limitDocs }));
    return mapResult.map((item) => item.value);
}
exports.mapReduceCollectionProperties = mapReduceCollectionProperties;
//# sourceMappingURL=mapReduceCollectionProperties.js.map