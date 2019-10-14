declare module NodeJS {
  import { MongoMemoryServer } from 'mongodb-memory-server-core'

  export interface Global {
    mongod: MongoMemoryServer
  }
}
