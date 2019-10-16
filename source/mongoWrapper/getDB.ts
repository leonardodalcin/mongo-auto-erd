import { MongoClient } from 'mongodb'

let client: MongoClient
let connectionURL: string
let dbName: string
export async function getDB(connectURL?: string, databaseName?: string) {
  if (connectURL && databaseName) {
    connectionURL = connectURL
    dbName = databaseName
    client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()
  }

  return client.db(dbName)
}
