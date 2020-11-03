module.exports = {
  setupFilesAfterEnv: ['./jest.setup'],
  moduleNameMapper: {
    '^@Component(.*)$': '<rootDir>/src/component$1',
    '^@Page(.*)$': '<rootDir>/src/page$1',
    '^@Public(.*)$': '<rootDir>/public$1',
    '^@Util(.*)$': '<rootDir>/src/util$1',
    '^@Api(.*)$': '<rootDir>/src/api$1',
  },
}
