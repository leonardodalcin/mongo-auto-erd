import { getCollectionByName } from '@mongo/getCollectionByName'
import { getDBCollectionNames } from '@mongo/getDBCollectionNames'
import { ObjectId } from 'bson'

async function isIDInCollection(id: ObjectId, collectionName: string) {
  const collection = await getCollectionByName(collectionName)
  return !!(await collection.findOne({_id: id}))
}
export async function getCollectionNameByDocumentID(id: ObjectId): Promise<string | null> {
  const collectionNames = await getDBCollectionNames()
  for (let i = 0; i < collectionNames.length; i++) {
    if (await isIDInCollection(id, collectionNames[i])) {
      return collectionNames[i]
    }
  }
  return null
}
