// tslint:disable-next-line
declare module NodeJS {
  // tslint:disable-next-line:interface-name
  export interface Global {
    mongod: import('mongodb-memory-server-core').MongoMemoryServer
    connectURL: string
    databaseName: string
  }
}
