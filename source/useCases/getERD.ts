import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongoWrapper/getDB'
import { getDBCollectionNames } from '@mongoWrapper/getDBCollectionNames'
import { getDistinctItems } from '@mongoWrapper/getDistinctItemsFromArray'
import { getCollectionNameByDocID } from '@mongoWrapper/getCollectionNameByDocID'
import { getRelationshipType } from '@mongoWrapper/getRelationshipType'
import { mapReduceCollectionProperties } from '@mongoWrapper/mapReduceCollectionProperties'
import { Spinner } from 'cli-spinner'

const spinner = new Spinner()
spinner.setSpinnerString(14)

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outdir: string
): Promise<IEntity[]> {
  await getDB(mongoURI, databaseName)
  spinner.start()
  const collectionNames = await getDBCollectionNames()
  const entities = []
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
      console.log(property.values)
      if (property.values.some((value) => value.type === 'objectId')) {
        entity.relationships.push({
          propertyName: property.name,
          sourceCollectionName: collectionName,
          targetCollectionName:
            (await getCollectionNameByDocID(property)) || '',
          type: (await getRelationshipType(property)) || ''
        })
      } else {
        entity.properties.push({name: property.name, types: getDistinctItems(property.values.map(((value) => value.type)))})
      }
    }
    entities.push(entity)
    // FileSystem.writeObjToFile(outdir + collectionName, mapReducedProperties)
  }

  spinner.stop()
  return entities
}
