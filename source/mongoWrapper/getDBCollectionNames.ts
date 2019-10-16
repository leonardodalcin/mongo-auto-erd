import { getDB } from '@mongoWrapper/getDB'

export async function getDBCollectionNames() {
  return (await(await getDB()).collections()).map((col) => col.collectionName)
}
