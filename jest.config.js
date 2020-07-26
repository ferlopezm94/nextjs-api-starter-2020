module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(e2e|unit).test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
