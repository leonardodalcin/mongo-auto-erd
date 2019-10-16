import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getRelationshipTargetCollectionName } from '@mongoWrapper/getRelationshipTargetCollectionName'
import { getRelationshipType } from '@mongoWrapper/getRelationshipType'

export async function getRelationship(property: IMapReducedProperty) {
  return {
    propertyName: property.name,
    targetCollectionName: await getRelationshipTargetCollectionName(property),
    type: await getRelationshipType(property)
  }
}
