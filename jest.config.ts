// https://jestjs.io/docs/en/configuration.html

export default {
  collectCoverage: true,
  coverageDirectory: 'tmp/test/reports/coverage',
  coverageProvider: 'v8',
  coverageReporters: ['cobertura', 'lcov', 'text'],
  preset: 'ts-jest',
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: 'tmp/test/reports/unit'}],
  ],
  testEnvironment: 'node',
}
