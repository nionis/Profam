const webpack = require('webpack'),
      path    = require("path");

module.exports = {
  entry: {
    profam: './source/root.js'
  },
  output: {
    path: path.resolve("./profam"),
    filename: '[name].js',
    publicPath: "/"
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        loaders: ['babel?cacheDirectory']
      }
    ]
  }
};
