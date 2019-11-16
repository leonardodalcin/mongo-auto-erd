import { IEntity } from '@interfaces/IEntity'
import { getCollectionNameByDocumentID } from '@mongoWrapper/getCollectionNameByDocumentID'

export async function mapEntityRelationships(entity: IEntity): Promise<void> {
  const oidProperties = entity.properties.filter((prop) => {
    return prop.types.some((type) => type === 'objectId')
  })

  for (let i = 0; i < oidProperties.length; i++) {
    for (let j = 0; j < oidProperties[i].values.length; j++) {
      const col = await getCollectionNameByDocumentID(oidProperties[i].values[j])
      if (col) {
        const found = entity.relationships.find((rel) => rel.targetCollectionName === col)
        if (found) {
          found.propertyNames.push(oidProperties[i].name)
        } else {
          entity.relationships.push({ targetCollectionName: col, propertyNames: [oidProperties[i].name] })
        }
        break
      }
    }
  }
}
