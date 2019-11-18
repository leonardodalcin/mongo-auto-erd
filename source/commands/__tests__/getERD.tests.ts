import { getERD } from '@commands/getERD'
import { populateDatabase } from '@tests/dbSetup'

describe('getERD', () => {
  beforeAll(async () => {
    await populateDatabase()
  })
  it('should match snapshot', async () => {
    const erd = await getERD(
      await global.mongod.getUri(),
      await global.mongod.getDbName(),
      './erd'
    )
    expect(erd.length).toBe(3)
  })
})
