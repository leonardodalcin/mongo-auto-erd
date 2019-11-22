"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeEntity_1 = require("@entity/makeEntity");
const FileSystem_1 = require("@fileSystem/FileSystem");
const getDB_1 = require("@mongo/getDB");
const getDBCollectionNames_1 = require("@mongo/getDBCollectionNames");
const convertEntitiesToDotLanguageAndGeneratePNGFile_1 = require("@outputPlugins/convertEntitiesToDotLanguageAndGeneratePNGFile");
const cli_spinner_1 = require("cli-spinner");
async function getERD(mongoURI, databaseName, outfile) {
    const spinner = new cli_spinner_1.Spinner();
    spinner.start();
    spinner.setSpinnerTitle('Connecting to database');
    await getDB_1.getDB(mongoURI, databaseName);
    const collectionNames = await getDBCollectionNames_1.getDBCollectionNames();
    const entities = [];
    const indexCount = collectionNames.length;
    let currentCollectionIndex = 1;
    for (const collectionName of collectionNames) {
        spinner.stop();
        spinner.setSpinnerTitle(`Defining entity for collection: ${collectionName}' (${currentCollectionIndex}/${indexCount})`);
        spinner.start();
        entities.push(await makeEntity_1.makeEntity(collectionName));
        currentCollectionIndex++;
    }
    if (outfile) {
        FileSystem_1.FileSystem.writeObjToFile(outfile + '.json', entities);
        convertEntitiesToDotLanguageAndGeneratePNGFile_1.convertEntitiesToDotLanguageAndGeneratePNGFile(entities, outfile + '.png');
    }
    spinner.stop();
    return entities;
}
exports.getERD = getERD;
//# sourceMappingURL=getERD.js.map