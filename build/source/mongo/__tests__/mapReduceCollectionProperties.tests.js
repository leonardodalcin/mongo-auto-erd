"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapReduceCollectionProperties_1 = require("@mongo/mapReduceCollectionProperties");
const dbSetup_1 = require("@tests/dbSetup");
const dbTeardown_1 = require("@tests/dbTeardown");
describe('mapReduceCollectionProperties', () => {
    beforeAll(async () => {
        await dbSetup_1.populateDatabase();
    });
    afterAll(async () => {
        await dbTeardown_1.dbTeardown();
    });
    describe('Tests for user model', () => {
        let properties;
        beforeAll(async () => {
            properties = await mapReduceCollectionProperties_1.mapReduceCollectionProperties('users');
        });
        it('should recover all properties', async () => {
            const propNames = properties.map((p) => p.name);
            expect(propNames.length).toBe(3);
            expect(propNames).toContain('_id');
            expect(propNames).toContain('__v');
            expect(propNames).toContain('name');
        });
        it('should recover 3 entities', async () => {
            const idValues = properties.find((prop) => prop.name === '_id').values;
            expect(idValues.length).toBe(3);
        });
        it('property values should contain the in db mock', async () => {
            const nameValues = properties.find((prop) => prop.name === 'name').values;
            expect(nameValues.length).toBe(2);
            expect(nameValues).toContain('Test user name');
            expect(nameValues).toContain('Test user name');
        });
    });
});
//# sourceMappingURL=mapReduceCollectionProperties.tests.js.map