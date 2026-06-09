import { IAggregatedProperty } from '@interfaces/IAggregatedProperty'
import { aggregateCollectionProperties } from '@mongo/aggregateCollectionProperties'
import { populateDatabase } from '@tests/dbSetup'
import { dbTeardown } from '@tests/dbTeardown'

describe('aggregateCollectionProperties', () => {
  beforeAll(async () => {
    await populateDatabase()
  })
  afterAll(async () => {
    await dbTeardown()
  })
  describe('Tests for user model', () => {
    let properties: IAggregatedProperty[]
    beforeAll(async () => {
      properties = await aggregateCollectionProperties('users')
    })
    it('should recover all properties', async () => {
      const propNames = properties.map((p) => p.name)
      expect(propNames.length).toBe(3)
      expect(propNames).toContain('_id')
      expect(propNames).toContain('__v')
      expect(propNames).toContain('name')
    })
    it('should recover 3 entities', async () => {
      const idValues = properties.find((prop) => prop.name === '_id')!.values
      expect(idValues.length).toBe(3)
    })
    it('property values should contain the in db mock', async () => {
      const nameValues = properties.find((prop) => prop.name === 'name')!.values
      // Only two of the three seeded users have a `name`; the third is
      // created with `name: undefined`, which Mongoose does not persist.
      expect(nameValues.length).toBe(2)
      expect(nameValues).toContain('Test user name')
      expect(nameValues).toContain('Test user name2')
    })
  })
  describe('Tests for array-valued properties (user group model)', () => {
    let properties: IAggregatedProperty[]
    beforeAll(async () => {
      properties = await aggregateCollectionProperties('usergroups')
    })
    it('should recover all properties', async () => {
      const propNames = properties.map((p) => p.name)
      expect(propNames.length).toBe(4)
      expect(propNames).toContain('_id')
      expect(propNames).toContain('__v')
      expect(propNames).toContain('name')
      expect(propNames).toContain('users')
    })
    it('should collect one value per document for an array field', async () => {
      // Two user groups are seeded, so the `users` field should yield two
      // values (one per document) rather than being flattened by $unwind.
      const usersValues = properties.find((prop) => prop.name === 'users')!
        .values
      expect(usersValues.length).toBe(2)
    })
    it('should preserve array field values as arrays', async () => {
      // Each `users` value must remain the document's array of object ids
      // (2 entries each), proving the pipeline does not flatten nested arrays.
      const usersValues = properties.find((prop) => prop.name === 'users')!
        .values
      usersValues.forEach((value) => {
        expect(Array.isArray(value)).toBe(true)
        expect(value.length).toBe(2)
      })
    })
  })
})
