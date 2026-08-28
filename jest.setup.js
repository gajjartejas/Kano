/* eslint-disable no-undef */
require('react-native-gesture-handler/jestSetup');
jest.mock('react-native-worklets', () => ({
  useWorkletCallback: jest.fn(fn => fn),
  createWorkletRuntime: jest.fn(),
}));
jest.mock('react-native-reanimated', () => {
  const { View, Text, Image, ScrollView } = require('react-native');
  return {
    __esModule: true,
    default: {
      View,
      Text,
      Image,
      ScrollView,
      createAnimatedComponent: c => c,
      timing: jest.fn(),
      spring: jest.fn(),
    },
    useSharedValue: jest.fn(val => ({ value: val })),
    useAnimatedStyle: jest.fn(() => ({})),
    useAnimatedProps: jest.fn(() => ({})),
    useDerivedValue: jest.fn(fn => ({ value: typeof fn === 'function' ? fn() : fn })),
    useAnimatedScrollHandler: jest.fn(),
    useAnimatedGestureHandler: jest.fn(),
    useAnimatedRef: jest.fn(() => ({ current: null })),
    withTiming: jest.fn(toValue => toValue),
    withSpring: jest.fn(toValue => toValue),
    withDecay: jest.fn(toValue => toValue),
    withSequence: jest.fn((...anims) => anims[0]),
    withRepeat: jest.fn(anim => anim),
    withDelay: jest.fn((_, anim) => anim),
    runOnJS: jest.fn(fn => fn),
    runOnUI: jest.fn(fn => fn),
    interpolate: jest.fn(),
    interpolateColor: jest.fn(),
    Extrapolation: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      bounce: jest.fn(),
      bezier: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };
});
jest.mock('react-native-localize', () => require('react-native-localize/mock'));
jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn(),
}));
jest.mock('@react-native-firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({
    logScreenView: jest.fn(),
    logEvent: jest.fn(),
  })),
}));
jest.mock('@react-native-firebase/crashlytics', () => ({
  getCrashlytics: jest.fn(() => ({
    recordError: jest.fn(),
    setAttributes: jest.fn(),
  })),
}));
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    clearAll: jest.fn(),
  })),
}));
jest.mock('react-native-device-info', () => require('react-native-device-info/jest/react-native-device-info-mock'));
jest.mock('react-native-sound', () => {
  return class Sound {
    static setCategory = jest.fn();
    play = jest.fn();
    stop = jest.fn();
    release = jest.fn();
  };
});
jest.mock('react-native-inappbrowser-reborn', () => ({
  open: jest.fn(),
  isAvailable: jest.fn(() => Promise.resolve(true)),
}));
jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn(),
  isAvailable: jest.fn(() => true),
}));
jest.mock('@realm/react', () => ({
  createRealmContext: () => ({
    RealmProvider: ({ children }: any) => children,
    useRealm: () => ({}),
    useQuery: () => [],
    useObject: () => null,
  }),
}));
jest.mock('react-native-fs', () => ({
  readFileAssets: jest.fn(() => Promise.resolve('<svg></svg>')),
  readFile: jest.fn(() => Promise.resolve('<svg></svg>')),
  exists: jest.fn(() => Promise.resolve(true)),
  MainBundlePath: 'MainBundlePath',
  DocumentDirectoryPath: 'DocumentDirectoryPath',
}));
