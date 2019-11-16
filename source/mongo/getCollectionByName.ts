import { getDB } from '@mongo/getDB'

export async function getCollectionByName(collectionName: string) {
  return (await getDB()).collection(collectionName)
}
