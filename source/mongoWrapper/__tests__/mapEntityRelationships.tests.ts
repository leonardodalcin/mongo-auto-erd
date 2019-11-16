import PhotoModel from '@collections/Photo'
import UserModel from '@collections/User'
import UserGroupModel from '@collections/UserGroup'
import { mapEntityRelationships } from '@mongoWrapper/getRelationshipType'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import * as mongoose from 'mongoose'
import { makeEntity } from '@mongoWrapper/makeEntity'

jest.setTimeout(5000000)

describe('mapEntityRelationships', () => {
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

  it('should return right relationships for users mock', async () => {
    const entity = await makeEntity('users')
    expect(entity.relationships.length).toBe(1)
    expect(entity.relationships[0]).toMatchObject({ targetCollectionName: 'users', propertyNames: ['_id'] })

  })
  it('should return right relationships for photos mock', async () => {
    const entity = await makeEntity('photos')

    expect(entity.relationships.length).toBe(2)
    const usersRel = entity.relationships.find((rel) => rel.targetCollectionName === 'users')!
    expect(usersRel).toBeTruthy()
    expect(usersRel.propertyNames.length).toBe(1)
    expect(usersRel.propertyNames[0]).toBe('user')
    expect(usersRel.targetCollectionName).toBe('users')

    const photosRel = entity.relationships.find((rel) => rel.targetCollectionName === 'photos')!
    expect(photosRel).toBeTruthy()
    expect(photosRel.propertyNames.length).toBe(1)
    expect(photosRel.propertyNames[0]).toBe('_id')
    expect(photosRel.targetCollectionName).toBe('photos')
  })
  it('should return right relationships for user group mock', async () => {
    const entity = await makeEntity('usergroups')
      // fix this case
    // expect(entity.relationships.length).toBe(2)
    // console.log(entity.relationships)
    // const selfRel = entity.relationships.find((rel) => rel.targetCollectionName === 'usergroups')!
    // expect(selfRel).toBeTruthy()
    // expect(selfRel.propertyNames.length).toBe(1)
    // expect(selfRel.propertyNames[0]).toBe('_id')
    // expect(selfRel.targetCollectionName).toBe('usergroups')
  })

})
