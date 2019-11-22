import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getDB } from '@mongo/getDB'

// tslint:disable-next-line:max-line-length
export async function mapReduceCollectionProperties(
  collectionName: string,
  limitDocs = 50
): Promise<IMapReducedProperty[]> {
  const db = await getDB()
  const collection = await db.collection(collectionName)
  /* istanbul ignore next */
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
      let result = []
      if(Array.isArray(values)) {
        result = values
      } else {
        result.push(values)
      }
      return {
        name: key,
        values: result
      }
    },
    { out: { inline: 1 }, limit: limitDocs }
  )) as Array<{ _id: string; value: IMapReducedProperty }>

  return mapResult
    .map((item) => {
      if (typeof item.value === 'object') {
        if (!Array.isArray(item.value.values)) {
          item.value.values = [item.value.values]
        }
        return item.value
      } else {
        return {
          name: item._id,
          values: [item.value]
        }
      }
    })
    .filter((result) => result !== null) as IMapReducedProperty[]
}
