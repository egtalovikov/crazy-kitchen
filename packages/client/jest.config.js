import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\-icon.(svg)$': '<rootDir>/src/__mocks__/svg.js',
    '^api/(.*)': '<rootDir>/src/api/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
    '^constants/(.*)': '<rootDir>/src/constants/$1',
    '^store/(.*)': '<rootDir>/src/store/$1',
    '^proptypes/(.*)': '<rootDir>/src/proptypes/$1',
    '^hocs/(.*)': '<rootDir>/src/hocs/$1',
    '^__mocks__/(.*)': '<rootDir>/src/__mocks__/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
}
