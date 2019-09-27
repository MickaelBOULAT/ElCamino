const express = require('express')
const https = require('https')
const pem = require('pem')
const webpack = require('webpack')
const builder = require('./build')

// CONF
const PORT = process.env.PORT || 8080
const USE_HTTPS = process.env.HTTPS || false

function createServer (opts = {}) {
  let config = builder(opts)
  let server
  let _resolve
  let readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  const app = express()
  app.use(express.static('dist'))
  if (USE_HTTPS) {
    pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
      if (err) throw err
      server = https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(PORT)
    })
  } else {
    server = app.listen(PORT)
  }

  webpack(config, () => _resolve())

  server.ready = readyPromise
  return server
}

module.exports = {
  createServer: createServer
}
