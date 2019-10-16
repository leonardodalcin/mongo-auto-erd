import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getRelationshipTargetCollectionName } from '@mongoWrapper/getRelationshipTargetCollectionName'
import { getRelationshipType } from '@mongoWrapper/getRelationshipType'
import { IProperty } from '@interfaces/IProperty'

export async function getProperty(property: IMapReducedProperty): Partial<IProperty> {
  return {
    propertyName: property.name,
    type: await getRelationshipType(property)
  }
}
