import { Db } from 'mongodb'
import * as mongoose from "mongoose"

 let connectionURL: string
let dbName: string
export async function getDB(connectURL?: string, databaseName?: string): Promise<Db> {
  if (connectURL && databaseName) {
    connectionURL = connectURL
    dbName = databaseName
    await mongoose.connect(connectURL, {dbName: databaseName})
  }

  return mongoose.connection.db as Db
}
