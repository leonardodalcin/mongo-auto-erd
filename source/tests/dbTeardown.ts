import * as mongoose from 'mongoose'

export async function dbTeardown() {
  await mongoose.connection.close()
  await global.mongod.stop()
}
