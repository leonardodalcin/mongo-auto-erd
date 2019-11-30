"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getERD_1 = require("../getERD");
const dbSetup_1 = require("../../tests/dbSetup");
describe('getERD', () => {
    beforeAll(async () => {
        await dbSetup_1.populateDatabase();
    });
    it('should match snapshot', async () => {
        const erd = await getERD_1.getERD(await global.mongod.getUri(), await global.mongod.getDbName(), './erd');
        expect(erd.length).toBe(3);
    });
});
//# sourceMappingURL=getERD.tests.js.map