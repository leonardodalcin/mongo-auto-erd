import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { mapReduceCollectionProperties } from '@mongo/mapReduceCollectionProperties'
import { populateDatabase } from '@tests/dbSetup'

describe('mapReduceCollectionProperties', () => {
  beforeAll(async () => {
    await populateDatabase()
  })
  describe('Tests for user model', () => {
    let properties: IMapReducedProperty[]
    beforeAll(async () => {
      properties = await mapReduceCollectionProperties('users')
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
      expect(nameValues.length).toBe(2)
      expect(nameValues).toContain('Test user name')
      expect(nameValues).toContain('Test user name')
    })
  })
})
