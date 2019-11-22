"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertEntitiesToDotLanguageAndGeneratePNGFile_1 = require("@outputPlugins/convertEntitiesToDotLanguageAndGeneratePNGFile");
const ERD_mock_1 = require("./ERD.mock");
describe('convertEntitiesToDotLanguageAndGeneratePNGFile.', () => {
    it('should convert mock to a valid dot file', () => {
        const dotLanguageGraph = convertEntitiesToDotLanguageAndGeneratePNGFile_1.convertEntitiesToDotLanguageAndGeneratePNGFile(ERD_mock_1.ERD);
        expect(dotLanguageGraph).toMatchSnapshot();
    });
});
//# sourceMappingURL=convertEntitiesToDotLanguageAndGeneratePNGFile.tests.js.map