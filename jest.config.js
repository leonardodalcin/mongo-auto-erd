module.exports = {
  preset: 'ts-jest',
  'setupFiles': ['<rootDir>/source/jest-setup-file.ts'],
  moduleNameMapper: {
    '^@mongoWrapper/(.*)$': '<rootDir>/source/mongoWrapper/$1',
    '^@interfaces/(.*)$': '<rootDir>/source/interfaces/$1',
    '^@CLI/(.*)$': '<rootDir>/source/services/$1',
    '^@useCases/(.*)$': '<rootDir>/source/useCases/$1',
    '^@fileSystem/(.*)$': '<rootDir>/source/fileSystem/$1',
    '^@collections/(.*)$': '<rootDir>/source/collections/$1'

  }
}
