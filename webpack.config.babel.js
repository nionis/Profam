import webpack from 'webpack'
import path from 'path'

const Uglify = webpack.optimize.UglifyJsPlugin
const Define = webpack.DefinePlugin
const dirSrc = path.join(__dirname, 'source')
const dirDist = path.join(__dirname, 'distribution')
const srcIndex = path.join(dirSrc, 'index.js')
const libName = 'profam'


const create = (env, target) => {
  const ENV = env.mode || 'production'
  const isUgly = env.ugly === 'true' || false
  // const isProd = ENV === 'production'
  // const isDev = ENV === 'development'

  const config = {
    target,

    entry: srcIndex,

    output: {
      path: dirDist,
      filename: libName,
      library: libName,
      libraryTarget: 'umd',
    },

    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          use: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
        },
      ],
    },

    plugins: [
      new Define({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
        },
      }),
    ],
  }

  if (isUgly) {
    config.plugins = config.plugins.concat([
      new Uglify({
        minimize: true,
        sourceMap: true,
        output: {
          comments: false,
        },
        compressor: {
          warnings: false,
        },
      }),
    ])
  }
  config.output.filename += target === 'node' ? '.node' : ''
  config.output.filename += isUgly ? '.min.js' : '.js'
  config.devtool = 'source-map'

  return config
}


module.exports = env => [
  create(env, 'node'),
  create(env, 'web'),
]
