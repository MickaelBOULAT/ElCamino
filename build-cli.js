const build = require('./build')
const devserver = require('./dev-server')
const prodserver = require('./prod-server')
const webpack = require('webpack')

const myArgs = process.argv.slice(2)
let i = 0
const config = {}
while (myArgs[i]) {
  const split = myArgs[i].split('=')
  const name = split[0]
  const value = split[1] || true
  config[name] = value
  i++
}

if (config.devserver) devserver.createServer(config)
else if (config.isoprod) prodserver.createServer(config)
else {
  const webpackconf = build(config)
  if (webpackconf instanceof Error) return console.log(webpackconf.message)
  webpack(webpackconf, (err, stats) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(stats.toString({
      all: false,
      colors: true,
      errors: true,
      warnings: true,
      moduleTrace: true,
      warningsFilter: /Conflicting order between/
    }))

    if (!stats.hasErrors()) console.log('\x1b[32m', 'Build successful !', '\x1b[0m')
  })
}
