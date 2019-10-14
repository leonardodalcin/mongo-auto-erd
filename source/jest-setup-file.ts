import 'reflect-metadata'
import { Photo } from '@collections/Photo'
import { User } from '@collections/User'
import { UserGroup } from '@collections/UserGroup'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import { createConnection, getMongoManager } from 'typeorm'
global.mongod = new MongoMemoryServer()
async function populateDatabase(mongoURI: string, dBName: string) {
  await createConnection({
    database: dBName,
    entities: [Photo, User, UserGroup],
    type: 'mongodb',
    url: mongoURI,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const manager = getMongoManager()
  const user1 = new User()
  user1.name = 'name1'
  const user2 = new User()
  user2.name = 'name2'

  const userGroup = new UserGroup([user1.id, user2.id])
  const user1Photo1 = new Photo(user1.id)
  const user1Photo2 = new Photo(user1.id)
  const user2Photo1 = new Photo(user2.id)

  await manager.save(user1)
  await manager.save(user2)
  await manager.save(userGroup)
  await manager.save(user1Photo1)
  await manager.save(user1Photo2)
  await manager.save(user2Photo1)
}
(async() => await populateDatabase(await global.mongod.getConnectionString(), await global.mongod.getDbName()))()
