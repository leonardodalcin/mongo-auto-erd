import { Photo } from '@collections/Photo'
import { UserGroup } from '@collections/UserGroup'
import { getERD } from '@useCases/getERD'
import 'reflect-metadata'
jest.setTimeout(5000000)
import { User } from '@collections/User'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createConnection, getMongoManager } from 'typeorm'

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
describe('getERD', () => {
  it('should get an ERD', async () => {
    const mongod = new MongoMemoryServer()
    await populateDatabase(await mongod.getConnectionString(), await mongod.getDbName())

    await getERD(
      await mongod.getConnectionString(),
      await mongod.getDbName(),
      './file.json'
    )
  })
})
