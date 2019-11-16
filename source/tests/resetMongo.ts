import { MongoMemoryServer } from 'mongodb-memory-server-core'

export async function resetMongo() {
  await global.mongod.stop()
  global.mongod = new MongoMemoryServer()
}
