import { getDB } from '@mongoWrapper/getDB'

export async function getCollectionByName(collectionName: string) {
  return (await getDB()).collection(collectionName)
}
