import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { ObjectId } from 'bson'

export async function getRelationshipType(property: IMapReducedProperty) {
  const arrayProps = property.values
    .filter((value) => value.type === 'array')
  const objectIds = arrayProps.map((prop) => {
    return prop.value.filter((value: any) => ObjectId.isValid(value))
  }).map((stringId) => new ObjectId(stringId))

  let relationshipType = '0'
  if (objectIds.length > 0) {
    relationshipType = 'n'
  } else {
    if (property.values.some((value) => value.type === 'objectId')) {
      relationshipType = '1'
    }
  }

  return relationshipType
}
