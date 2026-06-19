module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-inline-import', { extensions: ['.svg', '.png'] }],
    [
      'module-resolver',
      {
        alias: {
          navigation: './src/navigation',
          screens: './src/components/screens',
          atoms: './src/components/atoms',
          molecules: './src/components/molecules',
          organisms: './src/components/organisms',
          types: './src/types',
          hooks: './src/hooks',
          services: './src/services',
          helpers: './src/helpers',
          core: './src/core',
          assets: './assets/*',
          context: './src/context',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
