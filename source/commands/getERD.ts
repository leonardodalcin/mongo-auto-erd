import { makeEntity } from '@entity/makeEntity'
import { FileSystem } from '@fileSystem/FileSystem'
import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongo/getDB'
import { getDBCollectionNames } from '@mongo/getDBCollectionNames'
import { convertEntitiesToDotLanguageAndGeneratePNGFile } from '@outputPlugins/convertEntitiesToDotLanguageAndGeneratePNGFile'
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
    spinner.stop()
    spinner.setSpinnerTitle(
      `Defining entity for collection: ${collectionName}' (${currentCollectionIndex}/${indexCount})`
    )
    spinner.start()
    entities.push(await makeEntity(collectionName))
    console.log(entities)
    currentCollectionIndex++
  }
  if (outfile) {
    FileSystem.writeObjToFile(outfile + '.json', entities)
    convertEntitiesToDotLanguageAndGeneratePNGFile(entities, outfile + '.png')
  }

  spinner.stop()
  return entities
}
