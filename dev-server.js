const builder = require('./build')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const PORT = process.env.PORT || 8081

function createServer (opts) {
  opts = Object.assign({ devserver: true }, opts || {})
  const config = builder(opts)
  if (config instanceof Error) return console.error(config.message)
  const options = {
    port: PORT,
    host: 'localhost',
    hot: true,
    quiet: true,
    overlay: true,
    disableHostCheck: true
  }
  WebpackDevServer.addDevServerEntrypoints(config, options)
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, options)
  server.listen(options.port, '0.0.0.0', () => {
    console.log('Launching server on http://localhost:' + options.port + ' ... it will be ready soon :)')
  })

  return server
}

module.exports = {
  createServer: createServer
}
