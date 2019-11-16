import { mapEntityRelationships } from '@entity/getRelationshipType'
import { typeOf } from '@entity/typeOf'
import { IEntity } from '@interfaces/IEntity'
import { mapReduceCollectionProperties } from '@mongo/mapReduceCollectionProperties'

export async function makeEntity(collectionName: string) {
  const reduced = await mapReduceCollectionProperties(collectionName)
  const entity: IEntity = {
    name: collectionName,
    properties: reduced.map((p) => {
      return {
        name: p.name,
        types: p.values.map((val) => {
          return typeOf(val)
        }),
        values: p.values
      }
    }),
    relationships: []
  }
  await mapEntityRelationships(entity)
  return entity
}
