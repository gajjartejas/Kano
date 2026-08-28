module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(ttf|otf|eot|woff|woff2|png|jpg|jpeg|gif|svg|mp3|wav)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
    '^app/(.*)$': '<rootDir>/app/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|react-native-mmkv|@react-native-firebase)/',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/__mocks__/'],
};
