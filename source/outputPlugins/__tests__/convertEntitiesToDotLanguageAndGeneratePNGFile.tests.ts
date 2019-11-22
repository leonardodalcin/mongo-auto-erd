import { convertEntitiesToDotLanguageAndGeneratePNGFile } from '@outputPlugins/convertEntitiesToDotLanguageAndGeneratePNGFile'
import { ERD } from './ERD.mock'

describe('convertEntitiesToDotLanguageAndGeneratePNGFile.', () => {
  it('should convert mock to a valid dot file', () => {
    const dotLanguageGraph = convertEntitiesToDotLanguageAndGeneratePNGFile(ERD)
    expect(dotLanguageGraph).toMatchSnapshot()
  })
})
