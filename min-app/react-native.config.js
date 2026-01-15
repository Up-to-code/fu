module.exports = {
  dependencies: {
    // Exclude react-native-worklets from native linking
    // It's only needed for the Babel plugin, not for native code
    // react-native-reanimated 3.19.0+ includes worklets functionality
    'react-native-worklets': {
      platforms: {
        ios: null, // disable iOS platform, so it won't be linked
        android: null, // disable Android platform, so it won't be linked
      },
    },
  },
};
