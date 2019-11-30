"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeEntity_1 = require("../makeEntity");
const dbSetup_1 = require("../../tests/dbSetup");
const dbTeardown_1 = require("../../tests/dbTeardown");
describe('makeEntity', () => {
    beforeAll(async () => {
        await dbSetup_1.populateDatabase();
    });
    afterAll(async () => {
        await dbTeardown_1.dbTeardown();
    });
    it('should return right relationships for users mock', async () => {
        const entity = await makeEntity_1.makeEntity('users');
        expect(entity.relationships.length).toBe(1);
        expect(entity.relationships[0]).toMatchObject({
            propertyNames: ['_id'],
            targetCollectionName: 'users'
        });
    });
    it('should return right relationships for photos mock', async () => {
        const entity = await makeEntity_1.makeEntity('photos');
        expect(entity.relationships.length).toBe(2);
        const usersRel = entity.relationships.find((rel) => rel.targetCollectionName === 'users');
        expect(usersRel).toBeTruthy();
        expect(usersRel.propertyNames.length).toBe(1);
        expect(usersRel.propertyNames[0]).toBe('user');
        expect(usersRel.targetCollectionName).toBe('users');
        const photosRel = entity.relationships.find((rel) => rel.targetCollectionName === 'photos');
        expect(photosRel).toBeTruthy();
        expect(photosRel.propertyNames.length).toBe(1);
        expect(photosRel.propertyNames[0]).toBe('_id');
        expect(photosRel.targetCollectionName).toBe('photos');
    });
    it('should return right relationships for user group mock', async () => {
        const entity = await makeEntity_1.makeEntity('usergroups');
        expect(entity.relationships.length).toBe(2);
        const selfRel = entity.relationships.find((rel) => rel.targetCollectionName === 'usergroups');
        expect(selfRel).toBeTruthy();
        expect(selfRel.propertyNames.length).toBe(1);
        expect(selfRel.propertyNames[0]).toBe('_id');
        expect(selfRel.targetCollectionName).toBe('usergroups');
        const usersRel = entity.relationships.find((rel) => rel.targetCollectionName === 'users');
        expect(usersRel).toBeTruthy();
        expect(usersRel.propertyNames.length).toBe(1);
        expect(usersRel.propertyNames[0]).toBe('users');
        expect(usersRel.targetCollectionName).toBe('users');
    });
});
//# sourceMappingURL=makeEntity.tests.js.map