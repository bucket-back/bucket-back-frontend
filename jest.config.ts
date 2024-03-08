import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest/presets/default-esm',
};

export default config;
