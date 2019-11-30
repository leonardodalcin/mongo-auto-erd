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

  const entities = await Promise.all(
    collectionNames.map((name) => makeEntity(name))
  )
  spinner.setSpinnerTitle('Trying to generate .svg, .png and .dot formats')
  try {
    convertEntitiesToDotLanguageAndGeneratePNGFile(entities, outfile)
  } catch (e) {
    spinner.setSpinnerTitle(
      'Could not generate svg, .png and .dot formats, because graphviz is not installed'
    )
  }
  spinner.setSpinnerTitle('Generating .json format with')
  FileSystem.writeObjToFile(outfile + '.json', entities)

  spinner.stop()
  return entities
}
