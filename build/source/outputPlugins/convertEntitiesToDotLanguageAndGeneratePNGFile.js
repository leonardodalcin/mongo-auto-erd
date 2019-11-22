"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphviz_1 = require("graphviz");
const path_1 = require("path");
function entityToNodeLabel(entity) {
    const propLabels = entity.properties.map((property) => {
        return `${property.name} : ${property.types[0]}`;
    });
    const label = `{${entity.name} | ${propLabels.reduce((previousValue = '', currentValue) => {
        return `${previousValue}\\l${currentValue}`;
    })}}`;
    return label;
}
function convertEntitiesToDotLanguageAndGeneratePNGFile(entities, filepath) {
    const graph = graphviz_1.digraph('erd');
    for (const entity of entities) {
        graph.addNode(entity.name, {
            shape: 'record',
            label: entityToNodeLabel(entity)
        });
    }
    for (const entity of entities) {
        for (const relationship of entity.relationships) {
            if (entity.name !== relationship.targetCollectionName)
                graph.addEdge(entity.name, relationship.targetCollectionName);
        }
    }
    if (filepath)
        graph.output('png', path_1.resolve(filepath));
    return graph.to_dot();
}
exports.convertEntitiesToDotLanguageAndGeneratePNGFile = convertEntitiesToDotLanguageAndGeneratePNGFile;
//# sourceMappingURL=convertEntitiesToDotLanguageAndGeneratePNGFile.js.map