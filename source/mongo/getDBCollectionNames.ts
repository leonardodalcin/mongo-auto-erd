import * as mongoose from 'mongoose'

export async function getDBCollectionNames() {
  return (await mongoose.connection.db.listCollections(undefined, {nameOnly: true}).toArray()).map((col) => col.name)
}
