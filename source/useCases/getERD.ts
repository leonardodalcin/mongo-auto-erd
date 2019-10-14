import { FileSystem } from '@fileSystem/FileSystem'
import { DBWrapper } from '@mongoWrapper/DBWrapper'
import { Spinner } from 'cli-spinner'

const spinner = new Spinner()
spinner.setSpinnerString(14)

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outdir: string,
  collectionName: string
): Promise<void> {
  const dbWrapper = new DBWrapper(mongoURI, databaseName)
  await dbWrapper.connect()

  spinner.start()
  FileSystem.writeObjToFile(outdir, await dbWrapper.getEntityRelationships(collectionName))
  spinner.stop()

}
