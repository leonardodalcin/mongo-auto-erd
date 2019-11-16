import { makeEntity } from '@entity/makeEntity'
import { IEntity } from '@interfaces/IEntity'
import { getDB } from '@mongo/getDB'
import { getDBCollectionNames } from '@mongo/getDBCollectionNames'
import { Spinner } from 'cli-spinner'
import { mapReduceCollectionProperties } from 'source/mongo/mapReduceCollectionProperties'

const spinner = new Spinner()
spinner.setSpinnerString(14)

export async function getERD(
  mongoURI: string,
  databaseName: string,
  outdir: string
): Promise<IEntity[]> {
  spinner.start()
  await getDB(mongoURI, databaseName)
  const collectionNames = await getDBCollectionNames()
  const entities = []
  for (const collectionName of collectionNames) {
    entities.push(await makeEntity(collectionName))
  }
  spinner.stop()
  return entities
}
