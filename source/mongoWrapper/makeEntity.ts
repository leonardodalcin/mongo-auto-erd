import { IEntity } from '@interfaces/IEntity'
import { mapEntityRelationships } from '@mongoWrapper/getRelationshipType'
import { mapReduceCollectionProperties } from '@mongoWrapper/mapReduceCollectionProperties'
import { typeOf } from '@mongoWrapper/typeOf'

export async function makeEntity(collectionName: string) {
  const reduced = await mapReduceCollectionProperties('photos')
  const entity: IEntity = {
    name: 'photos',
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
