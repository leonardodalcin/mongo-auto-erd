import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getDB } from '@mongo/getDB'

// tslint:disable-next-line:max-line-length
export async function mapReduceCollectionProperties(
  collectionName: string,
  limitDocs = 50
): Promise<IMapReducedProperty[]> {
  const db = await getDB()
  const collection = await db.collection(collectionName)
  const mapResult = (await collection.mapReduce(
    function() {
      // @ts-ignore
      // tslint:disable-next-line
      for (let key in this) {
        // @ts-ignore
        emit(key, this[key])
      }
    },
    function(key: any, values: any) {
      if (!Array.isArray(values)) {
        values = [values]
      }
      return {
        name: key,
        values
      }
    },
    { out: { inline: 1 }, limit: limitDocs }
  )) as Array<{ _id: string; value: IMapReducedProperty }>
  return mapResult.map((item) => item.value)
}
