/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/fileMock.cjs',
  },
  // Only files named *.test.ts(x) or *.spec.ts(x) — keeps fixtures out
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
