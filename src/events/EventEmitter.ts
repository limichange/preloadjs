const has = Object.prototype.hasOwnProperty
const prefix = '~'

class Events {}

class EE {
  fn: Function
  context: any
  once: boolean

  constructor(fn: Function, context: any, once: boolean) {
    this.fn = fn
    this.context = context
    this.once = once || false
  }
}

export default class EventEmitter {
  #events = new Events()
  #eventsCount: number = 0

  addListener(event: string, fn: Function, once: boolean) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function')
    }

    const listener = new EE(fn, this, once)
    const evt = prefix ? prefix + event : event

    if (!this.#events[evt]) {
      this.#events[evt] = listener
      this.#eventsCount++
    } else if (!this.#events[evt].fn) {
      this.#events[evt].push(listener)
    } else {
      this.#events[evt] = [this.#events[evt], listener]
    }

    return this
  }

  clearEvent(evt: string) {
    if (--this.#eventsCount === 0) {
      this.#events = new Events()
    } else {
      delete this.#events[evt]
    }
  }

  eventNames() {
    const names = []
    let events: Events
    let name: string

    if (this.#eventsCount === 0) return names

    for (name in (events = this.#events)) {
      if (has.call(events, name)) {
        names.push(prefix ? name.slice(1) : name)
      }
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events))
    }

    return names
  }

  listeners(event) {
    var evt = prefix ? prefix + event : event,
      handlers = this.#events[evt]

    if (!handlers) return []
    if (handlers.fn) return [handlers.fn]

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn
    }

    return ee
  }

  listenerCount(event) {
    var evt = prefix ? prefix + event : event,
      listeners = this.#events[evt]

    if (!listeners) return 0
    if (listeners.fn) return 1
    return listeners.length
  }

  emit(event: string, ...data: any[]) {
    var evt = prefix ? prefix + event : event
    const [a1, a2, a3, a4, a5] = data

    if (!this.#events[evt]) return false

    var listeners = this.#events[evt],
      len = arguments.length,
      args,
      i

    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true)

      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true
        case 2:
          return listeners.fn.call(listeners.context, a1), true
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
      }

      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i]
      }

      listeners.fn.apply(listeners.context, args)
    } else {
      var length = listeners.length,
        j

      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true)

        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context)
            break
          case 2:
            listeners[i].fn.call(listeners[i].context, a1)
            break
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2)
            break
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3)
            break
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j]
              }

            listeners[i].fn.apply(listeners[i].context, args)
        }
      }
    }

    return true
  }

  on(event: string, fn: Function) {
    return this.addListener(event, fn, false)
  }

  once(event: string, fn: Function) {
    return this.addListener(event, fn, true)
  }

  removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event

    if (!this.#events[evt]) return this
    if (!fn) {
      this.clearEvent(evt)
      return this
    }

    var listeners = this.#events[evt]

    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        this.clearEvent(evt)
      }
    } else {
      const events = []
      const length = listeners.length

      for (let i = 0; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i])
        }
      }

      if (events.length) {
        this.#events[evt] = events.length === 1 ? events[0] : events
      } else {
        this.clearEvent(evt)
      }
    }

    return this
  }

  removeAllListeners(event: string) {
    let evt: string

    if (event) {
      evt = prefix ? prefix + event : event
      if (this.#events[evt]) this.clearEvent(evt)
    } else {
      this.#events = new Events()
      this.#eventsCount = 0
    }

    return this
  }
}
