"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
function isObjectId(item) {
    if (String(item).indexOf('ObjectId(') !== -1) {
        console.log('heere');
        return true;
    }
    if (String(item).length === 12 || String(item).length === 24) {
        return /^[0-9a-fA-F]+$/.test(String(item)) && mongodb_1.ObjectID.isValid(item);
    }
    return false;
}
function typeOf(item) {
    let itemType = typeof item;
    if (itemType === 'object') {
        if (item === null) {
            itemType = 'null';
        }
        if (Array.isArray(item)) {
            itemType = 'array';
        }
    }
    if (isObjectId(item)) {
        itemType = 'objectId';
    }
    return itemType;
}
exports.typeOf = typeOf;
//# sourceMappingURL=typeOf.js.map