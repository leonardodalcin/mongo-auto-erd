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
    const entities = await Promise.all(collectionNames.map((name) => makeEntity_1.makeEntity(name)));
    spinner.setSpinnerTitle('Trying to generate .svg, .png and .dot formats');
    try {
        convertEntitiesToDotLanguageAndGeneratePNGFile_1.convertEntitiesToDotLanguageAndGeneratePNGFile(entities, outfile);
    }
    catch (e) {
        spinner.setSpinnerTitle('Could not generate svg, .png and .dot formats, because graphviz is not installed');
    }
    spinner.setSpinnerTitle('Generating .json format with');
    FileSystem_1.FileSystem.writeObjToFile(outfile + '.json', entities);
    spinner.stop();
    return entities;
}
exports.getERD = getERD;
//# sourceMappingURL=getERD.js.map