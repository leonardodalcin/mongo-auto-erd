"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getERD_1 = require("@commands/getERD");
const dbTeardown_1 = require("@tests/dbTeardown");
describe('getERD', () => {
    afterAll(async (done) => {
        await dbTeardown_1.dbTeardown();
        done();
    });
    it('should match snapshot', async () => {
        const erd = await getERD_1.getERD(await global.mongod.getUri(), await global.mongod.getDbName());
        expect(erd).toBeTruthy();
    });
});
//# sourceMappingURL=getERD.tests.js.map