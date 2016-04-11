const webpack = require('webpack'),
      path    = require("path");

module.exports = {
  entry: {
    profamTest: './source/root.js'
  },
  output: {
    path: path.resolve("./profamTest"),
    filename: '[name].js',
    publicPath: "/"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-0')
          ]
        }
      }
    ]
  }
};
