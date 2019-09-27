/**
 * @file Entry point of the app
 */
import { Router, globals, logger } from 'splay'
import Connector from '@connector'
import '@css/style.less'

// import components asynchronously
const Example = () => import(/* webpackChunkName: "example" */'./components/example')
const Detail = () => import(/* webpackChunkName: "detail" */'./components/detail')

logger.mode = DEBUG

function launch () {
  // init Router
  Router.init('app', [
    { re: /^detail/, Component: Detail },
    { re: /^(.*)$/, Component: Example } // fallback url
  ], () => globals.isBox && Connector.ready(() => Connector.registerKeys()))
}

// active remote control & box communication
Connector.init().then(launch)
