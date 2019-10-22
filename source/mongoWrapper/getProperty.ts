import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { IProperty } from '@interfaces/IProperty'
import { getRelationshipTargetCollectionName } from '@mongoWrapper/getRelationshipTargetCollectionName'
import { getRelationshipType } from '@mongoWrapper/getRelationshipType'

export async function getProperty(property: IMapReducedProperty): Partial<IProperty> {
  return {
    propertyName: property.name,
    type: await getRelationshipType(property)
  }
}
