import { LoadQueue } from '../src'

const loadQueue = new LoadQueue()

console.log('loadQueue', loadQueue)

loadQueue.once('ready', () => console.log('ready'))
loadQueue.emit('ready')
