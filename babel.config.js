module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./__tests__/'],
          '@components': './src/components',
          '@redux': './src/redux',
          '@services': './src/services',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@config': './src/config',
          '@hooks': './src/hooks',
          '@assets': './assets',
          '@itype': './types',
        },
      },
      
    ],
    'react-native-reanimated/plugin',
  ],
};
