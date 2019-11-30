"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRelationshipType_1 = require("./getRelationshipType");
const typeOf_1 = require("./typeOf");
const mapReduceCollectionProperties_1 = require("../mongo/mapReduceCollectionProperties");
async function makeEntity(collectionName) {
    const reduced = await mapReduceCollectionProperties_1.mapReduceCollectionProperties(collectionName);
    const entity = {
        name: collectionName,
        properties: reduced.map((p) => {
            return {
                name: p.name,
                types: p.values.map((val) => {
                    return typeOf_1.typeOf(val);
                }),
                values: p.values
            };
        }),
        relationships: []
    };
    await getRelationshipType_1.mapEntityRelationships(entity);
    return entity;
}
exports.makeEntity = makeEntity;
//# sourceMappingURL=makeEntity.js.map