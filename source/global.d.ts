// tslint:disable-next-line
declare module NodeJS {
  import { MongoMemoryServer } from 'mongodb-memory-server-core'

  // tslint:disable-next-line:interface-name
  export interface Global {
    mongod: MongoMemoryServer
    connectURL: string
    databaseName: string
  }
}
