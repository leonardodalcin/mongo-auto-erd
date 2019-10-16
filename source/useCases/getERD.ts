import { FileSystem } from '@fileSystem/FileSystem'
import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongoWrapper/getDB'
import { getDBCollectionNames } from '@mongoWrapper/getDBCollectionNames'
import { mapReduceCollectionProperties } from '@mongoWrapper/mapReduceCollectionProperties'
import { Spinner } from 'cli-spinner'
import { IRelationship } from '@interfaces/IRelationship'
import { IPropertyType } from '@interfaces/IPropertyType'
import { IProperty } from '@interfaces/IProperty'
import { getRelationshipTargetCollectionName } from '@mongoWrapper/getRelationshipTargetCollectionName'

const spinner = new Spinner()
spinner.setSpinnerString(14)

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outdir: string,
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
    const properties:IProperty[] = []
    const relationships:IRelationship[] = []
    const mapReducedProperties = await mapReduceCollectionProperties(collectionName)
    for (const property of mapReducedProperties) {
      if (property.values.some((value) => value.type === 'objectId')) {
        relationships.push({
          propertyName: property.name, sourceCollectionName: collectionName, targetCollectionName: await getRelationshipTargetCollectionName(property), type: undefined

        })
      }
    }

  }
  spinner.stop()

}
