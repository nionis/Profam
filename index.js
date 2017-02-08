const isNode = require('detect-node')


module.exports = isNode ? (
  require('./distribution/profam.node.js')
) : (
  require('./distribution/profam.js')
)
