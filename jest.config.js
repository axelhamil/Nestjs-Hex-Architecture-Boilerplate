module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/shared/$1',
    '@forumInterfaces/(.*)': '<rootDir>/packages/forum/interfaces/$1',
    '@article/(.*)': '<rootDir>/packages/forum/modules/article/$1',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
