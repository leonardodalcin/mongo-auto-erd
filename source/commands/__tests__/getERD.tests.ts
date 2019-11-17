import { getERD } from '@commands/getERD'
import { populateDatabase } from '@tests/dbSetup'
import { dbTeardown } from '@tests/dbTeardown'

describe('getERD', () => {
  afterAll(async (done) => {
    await dbTeardown()
    done()
  })
  it('should match snapshot', async () => {
    const erd = await getERD(
      await global.mongod.getUri(),
      await global.mongod.getDbName()
    )
    expect(erd).toBeTruthy()
  })
})
