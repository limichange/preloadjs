import { LoadQueue } from '../src'
import EventEmitter from '../src/events/EventEmitter'

const loadQueue = new LoadQueue()

console.log('loadQueue', loadQueue)

const eventEmitter = new EventEmitter()

eventEmitter.once('ready', () => console.log('ready'))
eventEmitter.emit('ready')
