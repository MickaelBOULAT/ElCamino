import { globals, Router } from 'splay'

const REPEAT_KEY = true
const COLLECT_SOURCE = 'myapp'

/**
 * Put here rpc methods that only need to be fetched once
 */
const STATIC_API_METHODS = [
  'getSystem'
]

/**
 * @module Connector
 * @description Manage postMessage from the webapp for interacting with it
 * (keys and external methods)
 */
export default class Connector {
  static id = 1

  static requests = []

  static target = 'default'

  static platform = undefined

  static keys = ['Up', 'Down', 'Left', 'Right', 'Enter', 'Rec', 'Menu', 'Play',
    'Pause', 'Forward', 'Rewind', 'Back']
    .reduce((acc, cur) => { acc[cur] = REPEAT_KEY; return acc }, {})

  static setupApiCalls () {
    STATIC_API_METHODS.forEach(x => {
      Connector[x] = new Promise((resolve, reject) => Connector.rpc(x, resolve))
    })
  }

  /**
   * Init the Connector module, listen messages from webapp
   */
  static init () {
    globals.isBox = window.self !== window.top
    if (!globals.isBox) return Promise.resolve()
    window.addEventListener('message', Connector.onMessage, false)
    globals.shouldListenKeysEvents = false
    Connector.setupApiCalls()
    return Connector.targetDetection()
  }

  /**
   * Set target property with value given by webapp
   */
  static targetDetection () {
    return Connector.getSystem.then(({ target = '', platform = '' }) => {
      Object.defineProperty(Connector, 'target', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: platform + target
      })
      Object.defineProperty(Connector, 'platform', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: platform === '' && target === 'g9sat' ? 'g9' : platform
      })
    })
  }

  /**
   * Check current target
   * @param  {string} target - target to check
   */
  static targetIs (target) {
    return Connector.target === target
  }

  /**
   * Check current platform
   * @param  {string} platform - platform to check
   */
  static platformIs (platform) {
    return Connector.platform === platform
  }

  /**
   * Standard method for making RPC calls to webapp
   * @param  {string}   method - method to call
   * @param  {object}   params
   * @param  {Function} callback
   */
  static rpc (method, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    const uid = Connector.id++
    if (callback) Connector.requests[uid] = callback
    window.parent.postMessage({
      jsonrpc: '2.0',
      id: uid,
      method: method,
      params: params
    }, '*')
  }

  /**
   * Called when a message is received
   * @param  {Event} evt
   */
  static onMessage (evt) {
    if (!evt.data) return // only accept webapp messages
    if (evt.data.key) Connector.keyHandler(evt.data.key) // case its a key message
    else Connector.responseHandler(evt.data) // case its a response to a request
  }

  /**
   * Manage a received response with JSON-RPC 2.0 Specification<br/>
   * Run the registered callback (if exists)
   * @param  {object} data
   */
  static responseHandler (data) {
    if (data.id >= 0 && (!data.result || !data.error)) {
      if (!Connector.requests[data.id]) return
      const cb = Connector.requests[data.id]
      delete Connector.requests[data.id]
      const error = data.error ? new Error(data.error.message) : null
      const result = data.result || null
      cb.call(Connector, result, error)
    }
  }

  /**
   * Manage a received key press, trigger a KeyboardEvent
   * @param  {string} key
   */
  static keyHandler (key) {
    const keysCodes = {
      Left: '37',
      Up: '38',
      Right: '39',
      Down: '40',
      Enter: '13',
      Rec: '117',
      Back: '8',
      Menu: '120',
      Play: 'F2',
      Pause: 'F5',
      Forward: 'F3',
      Rewind: 'F1'
    }
    Router.currentComponent._onKeyPress(key.indexOf('Numeric') !== -1
      ? (key.slice(-1) >> 0) + 48
      : (keysCodes[key] || ''))
  }

  // --------------------------
  // Connector Functions -------------
  // --------------------------

  static ready (callback) {
    Connector.rpc('ready', callback)
  }

  /**
   * Register keys
   */
  static registerKeys () {
    const opts = { after: 700, throttle: 300 }
    const keys = Connector.keys
    for (const k in keys) if (keys[k]) keys[k] = opts
    Connector.addKeys(keys)
  }

  /**
   * @param  {Object}   keys
   * @param  {Function} callback [description]
   */
  static addKeys (k, callback) {
    Connector.rpc('addKeys', k, callback)
  }

  /**
   * @param  {Array}   keys
   * @param  {Function} callback [description]
   */
  static removeKeys (keysarr, callback) {
    // update local keys object (useful if first addKeys not already processed)
    keysarr.forEach(e => delete Connector.keys[e])
    Connector.rpc('removeKeys', keysarr, callback)
  }

  /**
   * Send a collect to switchplus. Asynchronous.
   * @param  {String} evt - corresponds to the actKey
   * @param  {Object} [data={}] - data to send
   */
  static collect (evt, data = {}) {
    setTimeout(() => {
      if (!evt || typeof evt !== 'string') {
        throw new Error('Collect first param must be a String !')
      }
      if (typeof data !== 'object') {
        throw new Error('Collect second param must be an Object !')
      }
      data.source = COLLECT_SOURCE
      data.event = evt
      data.dtAction = new Date()
      Connector.rpc('switchplus', Object.assign(data, {
        version: VERSION
      }))
    }, 0)
  }
}
