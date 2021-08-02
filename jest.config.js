/* eslint-env node */
module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  // Some node_modules need to be transformed.
  transformIgnorePatterns: ['/node_modules/(?!d3-|internmap).*', '\\.pnp\\.[^\\/]+$'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@/(.+)': '<rootDir>/src/$1',
  },
};
