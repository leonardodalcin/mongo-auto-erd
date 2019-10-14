import { getERD } from '@useCases/getERD'
import 'reflect-metadata'
jest.setTimeout(5000000)

describe.only('getRelationship', () => {
  it('should get an IRelationship', async () => {
    await getERD(
      await global.mongod.getConnectionString(),
      await global.mongod.getDbName(),
      './file.json'
    )
  })
})
