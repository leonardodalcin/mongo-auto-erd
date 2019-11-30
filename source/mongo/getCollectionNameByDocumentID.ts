import { getCollectionByName } from '@mongo/getCollectionByName'
import { getDBCollectionNames } from '@mongo/getDBCollectionNames'
import { ObjectId } from 'bson'

async function isIDInCollection(id: ObjectId, collectionName: string) {
  const collection = await getCollectionByName(collectionName)
  return !!(await collection.findOne({ _id: id }))
}
export async function getCollectionNameByDocumentID(
  id: ObjectId
): Promise<string | null> {
  const collectionNames = await getDBCollectionNames()
  const responses = await Promise.all(
    collectionNames.map(async (name) => {
      if (await isIDInCollection(id, name)) {
        return name
      } else {
        return null
      }
    })
  )

  return responses.find((name) => name !== null)
}
