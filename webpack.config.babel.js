import webpack from 'webpack'
import path from 'path'

const uglify = webpack.optimize.UglifyJsPlugin
const define = webpack.DefinePlugin
const dirSrc = path.join(__dirname, 'source')
const dirDist = path.join(__dirname, 'distribution')
const srcIndex = path.join(dirSrc, 'index.js')
const libName = 'profam'


const create = env => {
  const ENV = env.mode || 'production'
  const isUgly = env.ugly === 'true' || false
  const isProd = ENV === 'production'
  const isDev = ENV === 'development'

  const config = {
    entry : srcIndex,

    output: {
      path : dirDist,
      filename : libName,
      library : libName,
      libraryTarget : 'umd',
      umdNamedDefine : true
    },

    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          use: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        },
      ]
    },

    plugins : [
      new define({
        'process.env': {
          'NODE_ENV': JSON.stringify(ENV)
        }
      })
    ]
  }

  if (isUgly) {
    config.plugins = config.plugins.concat([
      new uglify({ minimize: true })
    ])
  }
  config.output.filename += isUgly ? '.min.js' : '.js'
  config.devtool = 'source-map'


  return config
}


module.exports = create
