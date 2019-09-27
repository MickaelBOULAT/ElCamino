const webpack = require('webpack')
const webpackDevConfig = require('./webpack.dev.config')
const webpackConfig = require('./webpack.config')

/**
 * Define allowed params and associated values
 * @type {Object}
 */
const allowedConf = {
  devserver: [true],
  isoprod: [true],
  nougly: [true],
  debug: ['html', 'console']
}

/**
 * Default configuration
 * @type {Object}
 */
const defaultConf = {
  devserver: false,
  isoprod: false,
  nougly: false,
  debug: ''
}

/**
 * Values to pass to less compiler
 * @type {Object}
 */
const LESS_VARS = {}

function build (conf) {
  // check given properties are authorized
  for (const key in conf) {
    if (!allowedConf[key]) return new Error('"' + key + '" is not allowed !')
    else if (allowedConf[key].indexOf(conf[key]) === -1) return new Error('"' + conf[key] + '" doesn\'t exist for ' + key)
  }

  // Set missing properties from default
  for (const key in defaultConf) {
    if (!Object.prototype.hasOwnProperty.call(conf, key)) conf[key] = defaultConf[key]
  }

  const opts = { lessVars: LESS_VARS }

  const wpcfg = conf.devserver ? webpackDevConfig(opts) : webpackConfig(opts)

  // Finalize webpack config (add plugins)
  // common plugins
  wpcfg.plugins.push(
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(conf.debug),
      VERSION: JSON.stringify(process.env.npm_package_version)
    })
  )

  // Force no uglify
  if (conf.nougly) wpcfg.optimization.minimize = false

  return wpcfg
}

module.exports = build
