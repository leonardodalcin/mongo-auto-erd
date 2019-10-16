import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { getCollectionNameByDocumentID } from '@mongoWrapper/getCollectionNameByDocumentID'
import { ObjectId } from 'mongodb'

export async function getRelationshipTargetCollectionName(property: IMapReducedProperty) {
  const objectIds = property.values
    .filter((value) => value.type === 'objectId')
    .map((value) => new ObjectId(value.value))

  for (const id of objectIds) {
    const targetCollectionName = await getCollectionNameByDocumentID(new ObjectId(id))
    if (targetCollectionName) { return targetCollectionName }
  }
  return null
}
