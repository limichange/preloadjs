// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/events/EventEmitter.ts":[function(require,module,exports) {
"use strict";

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var _EventEmitter_events, _EventEmitter_eventsCount;

Object.defineProperty(exports, "__esModule", {
  value: true
});
var has = Object.prototype.hasOwnProperty;
var prefix = '~';

var Events =
/** @class */
function () {
  function Events() {}

  return Events;
}();

var EE =
/** @class */
function () {
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }

  return EE;
}();

var EventEmitter =
/** @class */
function () {
  function EventEmitter() {
    _EventEmitter_events.set(this, new Events());

    _EventEmitter_eventsCount.set(this, 0);
  }

  EventEmitter.prototype.addListener = function (event, fn, once) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function');
    }

    var listener = new EE(fn, this, once);
    var evt = prefix ? prefix + event : event;

    if (!__classPrivateFieldGet(this, _EventEmitter_events, "f")[evt]) {
      __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt] = listener;

      __classPrivateFieldSet(this, _EventEmitter_eventsCount, +__classPrivateFieldGet(this, _EventEmitter_eventsCount, "f") + 1, "f");
    } else if (!__classPrivateFieldGet(this, _EventEmitter_events, "f")[evt].fn) {
      __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt].push(listener);
    } else {
      __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt] = [__classPrivateFieldGet(this, _EventEmitter_events, "f")[evt], listener];
    }

    return this;
  };

  EventEmitter.prototype.clearEvent = function (evt) {
    if (__classPrivateFieldSet(this, _EventEmitter_eventsCount, +__classPrivateFieldGet(this, _EventEmitter_eventsCount, "f") - 1, "f") === 0) {
      __classPrivateFieldSet(this, _EventEmitter_events, new Events(), "f");
    } else {
      delete __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt];
    }
  };

  EventEmitter.prototype.eventNames = function () {
    var names = [];
    var events;
    var name;
    if (__classPrivateFieldGet(this, _EventEmitter_eventsCount, "f") === 0) return names;

    for (name in events = __classPrivateFieldGet(this, _EventEmitter_events, "f")) {
      if (has.call(events, name)) {
        names.push(prefix ? name.slice(1) : name);
      }
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }

    return names;
  };

  EventEmitter.prototype.listeners = function (event) {
    var evt = prefix ? prefix + event : event,
        handlers = __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt];

    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }

    return ee;
  };

  EventEmitter.prototype.listenerCount = function (event) {
    var evt = prefix ? prefix + event : event,
        listeners = __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt];

    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
  };

  EventEmitter.prototype.emit = function (event) {
    var data = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      data[_i - 1] = arguments[_i];
    }

    var evt = prefix ? prefix + event : event;
    var a1 = data[0],
        a2 = data[1],
        a3 = data[2],
        a4 = data[3],
        a5 = data[4];
    if (!__classPrivateFieldGet(this, _EventEmitter_events, "f")[evt]) return false;

    var listeners = __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt],
        len = arguments.length,
        args,
        i;

    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;

        case 2:
          return listeners.fn.call(listeners.context, a1), true;

        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;

        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;

        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }

      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }

      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length,
          j;

      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;

          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;

          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;

          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;

          default:
            if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
              args[j - 1] = arguments[j];
            }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }

    return true;
  };

  EventEmitter.prototype.on = function (event, fn) {
    return this.addListener(event, fn, false);
  };

  EventEmitter.prototype.once = function (event, fn) {
    return this.addListener(event, fn, true);
  };

  EventEmitter.prototype.removeListener = function (event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!__classPrivateFieldGet(this, _EventEmitter_events, "f")[evt]) return this;

    if (!fn) {
      this.clearEvent(evt);
      return this;
    }

    var listeners = __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt];

    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        this.clearEvent(evt);
      }
    } else {
      var events = [];
      var length = listeners.length;

      for (var i = 0; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }

      if (events.length) {
        __classPrivateFieldGet(this, _EventEmitter_events, "f")[evt] = events.length === 1 ? events[0] : events;
      } else {
        this.clearEvent(evt);
      }
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function (event) {
    var evt;

    if (event) {
      evt = prefix ? prefix + event : event;
      if (__classPrivateFieldGet(this, _EventEmitter_events, "f")[evt]) this.clearEvent(evt);
    } else {
      __classPrivateFieldSet(this, _EventEmitter_events, new Events(), "f");

      __classPrivateFieldSet(this, _EventEmitter_eventsCount, 0, "f");
    }

    return this;
  };

  return EventEmitter;
}();

exports.default = EventEmitter;
_EventEmitter_events = new WeakMap(), _EventEmitter_eventsCount = new WeakMap();
},{}],"../src/loaders/AbstractLoader.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventEmitter_1 = __importDefault(require("../events/EventEmitter"));

var AbstractLoader =
/** @class */
function (_super) {
  __extends(AbstractLoader, _super);

  function AbstractLoader() {
    return _super.call(this) || this;
  }

  return AbstractLoader;
}(EventEmitter_1.default);

exports.default = AbstractLoader;
},{"../events/EventEmitter":"../src/events/EventEmitter.ts"}],"../src/LoadQueue.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AbstractLoader_1 = __importDefault(require("./loaders/AbstractLoader"));

var LoadQueue =
/** @class */
function (_super) {
  __extends(LoadQueue, _super);

  function LoadQueue() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return LoadQueue;
}(AbstractLoader_1.default);

exports.default = LoadQueue;
},{"./loaders/AbstractLoader":"../src/loaders/AbstractLoader.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.LoadQueue = void 0;

var LoadQueue_1 = require("./LoadQueue");

Object.defineProperty(exports, "LoadQueue", {
  enumerable: true,
  get: function get() {
    return __importDefault(LoadQueue_1).default;
  }
});
exports.version = '1.0.0';
},{"./LoadQueue":"../src/LoadQueue.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var src_1 = require("../src");

var EventEmitter_1 = __importDefault(require("../src/events/EventEmitter"));

var loadQueue = new src_1.LoadQueue();
console.log('loadQueue', loadQueue);
var eventEmitter = new EventEmitter_1.default();
eventEmitter.once('ready', function () {
  return console.log('ready');
});
eventEmitter.emit('ready');
},{"../src":"../src/index.ts","../src/events/EventEmitter":"../src/events/EventEmitter.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56087" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map