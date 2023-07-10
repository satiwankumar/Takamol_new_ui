module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|less)$': '<rootDir>/config/jest/CSSStub.js',
    '.+\\.svg$': '<rootDir>/config/jest/fileTransform.js',
    '.+\\.(css|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  collectCoverageFrom: [
    'src/**/*.{tsx,ts}',
    '!src/bootstrap.tsx',
    '!src/index.ts',
    '!src/tests/**/*',
    '!src/App.tsx',
    '!src/**/*.d.ts',
    '!src/**/*.styles.ts',
    '!src/mocks/**/*',
    '!src/**/*.enum.ts',
    '!src/app/routing/contexts/*'
  ],
  coverageReporters: ['lcov', 'html', 'json', 'text-summary'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: false,
      },
    ],
    '.+\\.(css|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '.+\\.svg$': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
  resetMocks: true,
};
