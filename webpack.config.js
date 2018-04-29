const webpack = require('webpack');

module.exports = {
  entry: {
    main: './App.web.js',
  },
  module: {
    rules: [
      {
        test: /\.(png)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
};
