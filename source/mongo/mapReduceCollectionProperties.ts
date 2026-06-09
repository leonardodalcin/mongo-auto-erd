import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getDB } from '@mongo/getDB'

// tslint:disable-next-line:max-line-length
export async function mapReduceCollectionProperties(
  collectionName: string,
  limitDocs = 50
): Promise<IMapReducedProperty[]> {
  const db = await getDB()
  const collection = await db.collection(collectionName)

  // We sample up to `limitDocs` documents and collect, for each top-level
  // field, every value observed across the sampled documents. This used to be
  // implemented with `collection.mapReduce`, but MongoDB Atlas (and other
  // managed deployments) disallow the `mapReduce` command, failing with
  // `CMD_NOT_ALLOWED: mapReduce`. The aggregation pipeline below produces the
  // same result and is supported everywhere.
  const aggregationResult = (await collection
    .aggregate([
      { $limit: limitDocs },
      { $project: { properties: { $objectToArray: '$$ROOT' } } },
      { $unwind: '$properties' },
      { $group: { _id: '$properties.k', values: { $push: '$properties.v' } } }
    ])
    .toArray()) as Array<{ _id: string; values: any[] }>

  return aggregationResult.map((item) => {
    return {
      name: item._id,
      values: item.values
    }
  })
}
