import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __BASE_URL__: process.env.BASE_URL,
  },
  moduleNameMapper: {
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@game/(.*)': '<rootDir>/src/game/$1',
    '^@store/(.*)': '<rootDir>/src/store/$1',
    '^@api/(.*)': '<rootDir>/src/api/$1',
    '^@types/(.*)': '<rootDir>/src/types/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@gameObjects/(.*)': '<rootDir>/src/game/objects/$1',
    '^@gameParams/(.*)': '<rootDir>/src/game/parameters/$1',
    '^@gameTypes/(.*)': '<rootDir>/src/game/types/$1',
    '\\-icon.(svg)$': '<rootDir>/src/__mocks__/svg.js',
    '^__mocks__/(.*)': '<rootDir>/src/__mocks__/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    // '^.+\\.(png|svg|jpg|jpeg)$': 'jest-transform-stub',
    '\\.(svg|png)$': '<rootDir>/src/__mocks__/styleMock.cjs',
  },
}
