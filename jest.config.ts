// https://jestjs.io/docs/en/configuration.html

export default {
  collectCoverage: true,
  coverageDirectory: 'tmp/test/coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
}
