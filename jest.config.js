module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/source/**/*.tests.ts'],
  setupFiles: ['<rootDir>/source/tests/setup.ts'],
  moduleNameMapper: {
    '^@commands/(.*)$': '<rootDir>/source/commands/$1',
    '^@entity/(.*)$': '<rootDir>/source/entity/$1',
    '^@fileSystem/(.*)$': '<rootDir>/source/fileSystem/$1',
    '^@interfaces/(.*)$': '<rootDir>/source/interfaces/$1',
    '^@mongo/(.*)$': '<rootDir>/source/mongo/$1',
    '^@tests/(.*)$': '<rootDir>/source/tests/$1'
  }
}
