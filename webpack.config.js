'use strict';

const path     = require('path'),
      webpack  = require('webpack'),
      uglify   = webpack.optimize.UglifyJsPlugin,
      define   = webpack.DefinePlugin,
      argv     = require('yargs').argv,
      mode     = argv.mode || 'production',
      isProd   = mode === 'production',
      isDev    = mode === 'development',
      isUgly   = argv.ugly === 'true' || false,
      dirSrc   = path.join(__dirname, 'source'),
      srcIndex = path.join(dirSrc, 'index.js'),
      dirDist  = path.join(__dirname, 'distribution'),
      libName  = 'profam';


//makeConfig
class makeConfig {
  constructor() {
    this.config  = {
      entry : srcIndex,

      output: {
        path          : dirDist,
        filename      : libName,
        library       : libName,
        libraryTarget : 'umd',
        umdNamedDefine: true
      },

      module: {
        loaders: [
          {
            test: /(\.jsx|\.js)$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/
          }
        ]
      },

      resolve: {
        root: path.resolve(dirSrc),
        extensions: ['', '.js']
      },

      plugins : [
        new define({
          'process.env': {
            'NODE_ENV': JSON.stringify(mode)
          }
        })
      ]
    };

    this.plugins();
    this.output();
    this.devtool();
  }

  plugins() {
    if (isUgly) {
      this.config.plugins = this.config.plugins.concat([
        new uglify({ minimize: true })
      ]);
    }
  }
  output() {
    this.config.output.filename += isUgly ? '.min.js' : '.js';
  }
  devtool() {
    this.config.devtool = 'source-map';
  }
};


module.exports = new makeConfig().config;
