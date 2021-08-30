module.exports = function bpe(api) {
  //   api.cache(true);
  const presets = [
    'babel-preset-expo',
    'module:react-native-dotenv',
    'module:metro-react-native-babel-preset'
  ]

  const moduleResolver = [
    'module-resolver',
    {
      root: './src',
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        i18n: './src/i18n',
        styles: './src/styles',
        constants: './src/constants',
        assets: './assets'
      }
    }
  ]

  const plugins = [moduleResolver]

  const envDevelopment = {
    presets: presets,
    plugins: ['@babel/transform-react-jsx-source', moduleResolver]
  }

  if (api.env(['development', 'test'])) {
    return envDevelopment
  }

  return {
    presets: presets,
    plugins: plugins
  }
}
