import PhotoModel from '@tests/collections/Photo'
import UserModel from '@tests/collections/User'
import UserGroupModel from '@tests/collections/UserGroup'
import { resetMongo } from '@tests/resetMongo'
import * as mongoose from 'mongoose'
jest.setTimeout(60000)
export async function populateDatabase() {
  await resetMongo()
  await mongoose.connect(await global.mongod.getUri(), { dbName: await global.mongod.getDbName() })
  const user = await UserModel.create({ name: 'Test user name' })
  await UserModel.create({ name: 'Test user name2' })
  await UserModel.create({ name: undefined })

  await PhotoModel.create({ title: 'Test photo name', user: user._id })
  await PhotoModel.create({ title: 'Test photo name2', user: user._id })

  await UserGroupModel.create({ name: 'Test user group', users: [user._id, user._id] })
  await UserGroupModel.create({ name: 'Test user group2', users: [user._id, user._id] })
}
