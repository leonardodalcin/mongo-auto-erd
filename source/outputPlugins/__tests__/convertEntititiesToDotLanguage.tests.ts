import { FileSystem } from '@fileSystem/FileSystem'
import { convertEntitiesToDotLanguage } from '@outputPlugins/convertEntitiesToDotLanguage'
import { ERD } from './ERD.mock'

describe('convertEntitiesToDotLanguage.', () => {
  it('should convert mock to a valid dot file',  () => {
    const dotLanguageGraph = convertEntitiesToDotLanguage(ERD)
    expect(dotLanguageGraph).toBeTruthy()
    FileSystem.writeObjToFile('test.dot', dotLanguageGraph)
  })
})
