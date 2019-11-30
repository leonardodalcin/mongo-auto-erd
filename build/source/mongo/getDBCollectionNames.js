"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
async function getDBCollectionNames() {
    return (await mongoose.connection.db
        .listCollections(undefined, { nameOnly: true })
        .toArray()).map((col) => col.name);
}
exports.getDBCollectionNames = getDBCollectionNames;
//# sourceMappingURL=getDBCollectionNames.js.map