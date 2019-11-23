"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("@entity/typeOf");
const getCollectionNameByDocumentID_1 = require("@mongo/getCollectionNameByDocumentID");
const lodash_1 = require("lodash");
async function mapEntityRelationships(entity) {
    const oidProperties = entity.properties.filter((prop) => {
        return prop.types[0] === 'objectId';
    });
    const arrayProperties = entity.properties
        .filter((prop) => {
        return prop.types.some((type) => type === 'array');
    })
        .map((prop) => {
        prop.values = lodash_1.flattenDeep(prop.values).filter((value) => typeOf_1.typeOf(value) === 'objectId');
        prop.types = prop.values.map((value) => typeOf_1.typeOf(value));
        return prop;
    });
    for (let i = 0; i < oidProperties.length; i++) {
        for (let j = 0; j < oidProperties[i].values.length; j++) {
            const col = await getCollectionNameByDocumentID_1.getCollectionNameByDocumentID(oidProperties[i].values[j]);
            if (col) {
                const found = entity.relationships.find((rel) => rel.targetCollectionName === col);
                if (found) {
                    found.propertyNames.push(oidProperties[i].name);
                }
                else {
                    entity.relationships.push({
                        propertyNames: [oidProperties[i].name],
                        targetCollectionName: col
                    });
                }
                break;
            }
        }
    }
    for (let i = 0; i < arrayProperties.length; i++) {
        for (let j = 0; j < arrayProperties[i].values.length; j++) {
            const col = await getCollectionNameByDocumentID_1.getCollectionNameByDocumentID(arrayProperties[i].values[j]);
            if (col) {
                const found = entity.relationships.find((rel) => rel.targetCollectionName === col);
                if (found) {
                    found.propertyNames.push(arrayProperties[i].name);
                }
                else {
                    entity.relationships.push({
                        propertyNames: [arrayProperties[i].name],
                        targetCollectionName: col
                    });
                }
                break;
            }
        }
    }
}
exports.mapEntityRelationships = mapEntityRelationships;
//# sourceMappingURL=getRelationshipType.js.map