import { makeEntity } from '@entity/makeEntity'
import { FileSystem } from '@fileSystem/FileSystem'
import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongo/getDB'
import { getDBCollectionNames } from '@mongo/getDBCollectionNames'
import { Spinner } from 'cli-spinner'

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outfile?: string
): Promise<IEntity[]> {
  const spinner = new Spinner()
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
  if (outfile) { FileSystem.writeObjToFile(outfile + '.json', entities) }
  spinner.stop()
  return entities
}
