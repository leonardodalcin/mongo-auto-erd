import { getERD } from '@useCases/getERD'
import 'reflect-metadata'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import PhotoModel from '@collections/Photo'
import UserModel from '@collections/User'
import UserGroupModel from '@collections/UserGroup'
import * as mongoose from 'mongoose'
jest.setTimeout(5000000)

describe('getERD', () => {
  let mongod: MongoMemoryServer

  beforeAll(async() => {
    mongod = new MongoMemoryServer()
    await mongoose.connect(await mongod.getUri(), {dbName: await mongod.getDbName()})
    const user = await UserModel.create({name: 'Test user name'})
    await PhotoModel.create({title: 'Test photo name', user: user._id})
    await UserGroupModel.create({name: 'Test user group', users: [user._id]})

  })
  afterAll(async() => {
    await mongod.stop()
  })
  it('should get an ERD', async () => {
    await expect(getERD(
      await mongod.getConnectionString(),
      await mongod.getDbName(),
      './file.json'
    )).resolves.toMatchSnapshot()
  })
})
