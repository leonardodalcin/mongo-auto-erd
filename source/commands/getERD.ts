import { makeEntity } from '@entity/makeEntity'
import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongo/getDB'
import { getDBCollectionNames } from '@mongo/getDBCollectionNames'
import { Spinner } from 'cli-spinner'
import { mapReduceCollectionProperties } from 'source/mongo/mapReduceCollectionProperties'

const spinner = new Spinner()

// spinner.setSpinnerString()

export async function getERD(
  mongoURI: string,
  databaseName: string
): Promise<IEntity[]> {
  spinner.start()
  spinner.setSpinnerTitle('Connecting to database')
  await getDB(mongoURI, databaseName)
  const collectionNames = await getDBCollectionNames()
  const entities = []
  const indexCount = collectionNames.length
  let currentCollectionIndex = 1
  for (const collectionName of collectionNames) {
    spinner.setSpinnerTitle(`Defining entity for collection: ${collectionName}' +
      ' (${currentCollectionIndex}/${indexCount}`)
    entities.push(await makeEntity(collectionName))
    currentCollectionIndex++
  }
  spinner.stop()
  return entities
}
