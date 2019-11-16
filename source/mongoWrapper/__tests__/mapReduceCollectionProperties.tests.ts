import PhotoModel from '@collections/Photo'
import UserModel from '@collections/User'
import UserGroupModel from '@collections/UserGroup'
import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { mapReduceCollectionProperties } from '@mongoWrapper/mapReduceCollectionProperties'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import * as mongoose from 'mongoose'

jest.setTimeout(5000000)

describe('mapReduceCollectionProperties', () => {
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await mongoose.connect(await mongod.getUri(), { dbName: await mongod.getDbName() })
    const user = await UserModel.create({ name: 'Test user name' })
    await UserModel.create({ name: 'Test user name2' })
    await UserModel.create({ name: undefined })

    await PhotoModel.create({ title: 'Test photo name', user: user._id })
    await PhotoModel.create({ title: 'Test photo name2', user: user._id })

    await UserGroupModel.create({ name: 'Test user group', users: [user._id, user._id] })
    await UserGroupModel.create({ name: 'Test user group2', users: [user._id, user._id] })
  })
  afterAll(async () => {
    await mongod.stop()
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
      const idValues = (properties.find((prop) => prop.name === '_id'))!.values
      expect(idValues.length).toBe(3)
    })
    it('property values should contain the in db mock', async () => {
      const nameValues = (properties.find((prop) => prop.name === 'name'))!.values
      expect(nameValues.length).toBe(2)
      expect(nameValues).toContain('Test user name')
      expect(nameValues).toContain('Test user name')
    })
  })

})
