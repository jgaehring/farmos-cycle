import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import makeIdbDriver from 'cycle-idb'
import {App} from './app'

const main = App

const drivers = {
  DOM: makeDOMDriver('#root'),
  IDB: makeIdbDriver('farm-db', 1, upgrade => {
      upgrade.createObjectStore('logs', {keyPath: 'id'})
  }),
  logger: msg$ => { msg$.addListener({next: msg => console.log(msg)})}
}

run(main, drivers)
