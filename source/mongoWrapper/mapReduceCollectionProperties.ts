import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getDB } from '@mongoWrapper/getDB'
import { getPropertyType } from '@mongoWrapper/getPropertyType'

// tslint:disable-next-line:max-line-length
export async function mapReduceCollectionProperties(collectionName: string, limitDocs = 50): Promise<IMapReducedProperty[]> {
  const db = await getDB()
  const collection = await db.collection(collectionName)
  const mapResult = (await collection.mapReduce(
    function() {
      // tslint:disable-next-line
      for (let key in this) {
        // @ts-ignore
        emit(key, this[key])
      }
    },
    function(key: any, values: any) {
      // distinct
      if (!Array.isArray(values)) { return [] }
      const distinctItems: any[] = values.filter(function(
        value,
        index,
        self
      ) {
        return self.indexOf(value) === index
      })
      return distinctItems.join(';')
    },
    { out: { inline: 1 }, limit: limitDocs }
  )) as Array<{ _id: string; value: string }>
  const mapReducedProperties = mapResult.map(
    (item) => {
      const values = item.value
        ? String(item.value).split(';')
        : [item.value]

      const mapReducedProperty: IMapReducedProperty = {
        canBeNull: false, canBeUndefined: false, name: item._id, values: []
      }
      for (const value of values) {
        const valueType = getPropertyType(value)
        if (valueType === 'undefined') { mapReducedProperty.canBeUndefined = true; continue}
        if (valueType === 'null') { mapReducedProperty.canBeNull = true; continue }
        mapReducedProperty.values.push({
          type: valueType,
          value: value
            ? String(value)
              .replace(/ObjectId\("/g, '')
              .replace(/"\)/g, '')
            : value
        })
      }

      return mapReducedProperty
    })
  return mapReducedProperties
}
