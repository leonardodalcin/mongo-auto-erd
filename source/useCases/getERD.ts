import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongoWrapper/getDB'
import { getDBCollectionNames } from '@mongoWrapper/getDBCollectionNames'
import { getRelationshipTargetCollectionName } from '@mongoWrapper/getRelationshipTargetCollectionName'
import { getRelationshipType } from '@mongoWrapper/getRelationshipType'
import { mapReduceCollectionProperties } from '@mongoWrapper/mapReduceCollectionProperties'
import { Spinner } from 'cli-spinner'

const spinner = new Spinner()
spinner.setSpinnerString(14)

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outdir: string
): Promise<void> {
  await getDB(mongoURI, databaseName)
  spinner.start()
  const collectionNames = await getDBCollectionNames()
  for (const collectionName of collectionNames) {
    const entity: IEntity = {
      collectionName,
      properties: [],
      relationships: []
    }

    const mapReducedProperties = await mapReduceCollectionProperties(
      collectionName
    )
    for (const property of mapReducedProperties) {
      if (property.values.some((value) => value.type === 'objectId')) {
        entity.relationships.push({
          propertyName: property.name,
          sourceCollectionName: collectionName,
          targetCollectionName:
            (await getRelationshipTargetCollectionName(property)) || '',
          type: (await getRelationshipType(property)) || ''
        })
      }
    }
  }
  spinner.stop()
}
