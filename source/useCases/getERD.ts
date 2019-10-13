import { FileSystem } from '@fileSystem/FileSystem'
import { DBWrapper } from '@mongoWrapper/DBWrapper'
import { Spinner } from 'cli-spinner'

const spinner = new Spinner()
spinner.setSpinnerString(14)

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outdir: string
): Promise<void> {
  const dbWrapper = new DBWrapper(mongoURI, databaseName)
  await dbWrapper.connect()
  const collectionNames = await dbWrapper.getDBCollectionNames()
  for (let i = 0; i < collectionNames.length; i++) {
    spinner.setSpinnerTitle(
      `Generating entity for collection ${i}/${collectionNames.length}, named: ${collectionNames[i]}. Output file will be saved at: ${outdir}`
    )
    spinner.start()
    FileSystem.writeObjToFile(outdir, await dbWrapper.getEntity(collectionNames[i]))
    spinner.stop()
  }
}
