var augmentor = (function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  var self = null ||
  /* istanbul ignore next */
  {};
  self.CustomEvent = typeof CustomEvent === 'function' ? CustomEvent : function (__p__) {
    CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
    return CustomEvent;

    function CustomEvent(type, init) {
      if (!init) init = {};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
      return e;
    }
  }('prototype');
  var CustomEvent$1 = self.CustomEvent;

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = null ||
  /* istanbul ignore next */
  {};

  try {
    self$1.WeakSet = WeakSet;
  } catch (WeakSet) {
    // requires a global WeakMap (IE11+)
    (function (WeakMap) {
      var all = new WeakMap();
      var proto = WeakSet.prototype;

      proto.add = function (value) {
        return all.get(this).set(value, 1), this;
      };

      proto.delete = function (value) {
        return all.get(this).delete(value);
      };

      proto.has = function (value) {
        return all.get(this).has(value);
      };

      self$1.WeakSet = WeakSet;

      function WeakSet(iterable) {

        all.set(this, new WeakMap());
        if (iterable) iterable.forEach(this.add, this);
      }
    })(WeakMap);
  }

  var WeakSet$1 = self$1.WeakSet;

  

  var now = null;
  var current = function current() {
    return now;
  };
  var empty = [];
  var setup = [];
  var $ = function $(value, args) {
    return typeof(value) === typeof($) ? value.apply(null, args) : value;
  };
  var diff = function diff(a, b) {
    return a.length !== b.length || a.some(diverse, b);
  };
  var stacked = function stacked(id) {
    return function (runner) {
      var state = {
        i: 0,
        stack: []
      };
      runner[id] = state;
      runner.before.push(function () {
        state.i = 0;
      });
    };
  };
  var id$1 = 0;
  var uid = function uid() {
    return '_$' + id$1++;
  };
  var unstacked = function unstacked(id) {
    var _now = now,
        state = _now[id],
        update = _now.update;
    var i = state.i,
        stack = state.stack;
    state.i++;
    return {
      i: i,
      stack: stack,
      update: update,
      unknown: i === stack.length
    };
  };
  var augmentor = (function (fn) {
    var current = runner($);
    each(setup, current);

    $.reset = function () {
      each(current.reset, current);

      for (var key in current) {
        if (/^_\$/.test(key)) current[key].stack.splice(0);
      }
    };

    return $;

    function $() {
      var prev = now;
      now = current;
      var _ = current._,
          before = current.before,
          after = current.after,
          external = current.external;

      try {
        var result;

        do {
          _.$ = _._ = false;
          each(before, current);
          result = fn.apply(_.c = this, _.a = arguments);
          each(after, current);
          if (external.length) each(external.splice(0), result);
        } while (_._);

        return result;
      } finally {
        _.$ = true;
        now = prev;
      }
    }
  });

  var each = function each(arr, value) {
    var length = arr.length;
    var i = 0;

    while (i < length) {
      arr[i++](value);
    }
  };

  var runner = function runner($) {
    var _ = {
      _: true,
      $: true,
      c: null,
      a: null
    };
    return {
      _: _,
      before: [],
      after: [],
      external: [],
      reset: [],
      update: function update() {
        return _.$ ? $.apply(_.c, _.a) : _._ = true;
      }
    };
  };

  function diverse(value, i) {
    return value !== this[i];
  }

  var id$2 = uid();
  var cancel, request;

  try {
    cancel = cancelAnimationFrame;
    request = requestAnimationFrame;
  } catch (o_O) {
    cancel = clearTimeout;
    request = setTimeout;
  }

  var create = function create(always, check, inputs, raf, cb, stack, i) {
    var info = {
      always: always,
      cb: cb,
      check: check,
      clean: null,
      inputs: inputs,
      raf: raf,
      t: 0,
      update: check,
      fn: function fn() {
        set$1(stack[i], info.cb());
      }
    };
    return info;
  };

  var effect = function effect(raf) {
    return function (cb, refs) {
      var _unstacked = unstacked(id$2),
          i = _unstacked.i,
          stack = _unstacked.stack,
          unknown = _unstacked.unknown;

      var comp = refs || empty;

      if (unknown) {
        var always = comp === empty;

        var check = always || !raf || typeof(comp) !== typeof(effect);

        if (always || !raf || typeof(comp) !== typeof(effect)) {
          stack.push(create(always, check, comp, raf, cb, stack, i));
        } else {
          current().external.push(function (result) {
            return refs(cb, result);
          });
          stack.push(create(always, always, empty, raf, effect, stack, i));
        }
      } else {
        var info = stack[i];
        var _check = info.check,
            _always = info.always,
            inputs = info.inputs;

        if (_check && (_always || diff(inputs, comp))) {
          info.cb = cb;
          info.inputs = comp;
          info.update = true;
        }
      }
    };
  };

  var set$1 = function set(info, clean) {
    info.t = 0;
    info.clean = clean;
  };

  setup.push(function (runner) {
    var stack = [];
    var state = {
      i: 0,
      stack: stack
    };

    var drop = function drop(current$$1, clean, raf, t) {
      if (raf && t) cancel(t);else if (clean) clean();
      set$1(current$$1, null);
    };

    runner[id$2] = state;
    runner.before.push(function () {
      state.i = 0;
    });
    runner.reset.push(function () {
      state.i = 0;

      for (var length = stack.length, i = 0; i < length; i++) {
        var _current = stack[i];
        var check = _current.check,
            clean = _current.clean,
            raf = _current.raf,
            t = _current.t;
        if (check) drop(_current, clean, raf, t);
      }
    });
    runner.after.push(function () {
      for (var length = stack.length, i = 0; i < length; i++) {
        var _current2 = stack[i];
        var check = _current2.check,
            clean = _current2.clean,
            fn = _current2.fn,
            raf = _current2.raf,
            t = _current2.t,
            update = _current2.update;

        if (check && update) {
          _current2.update = false;
          drop(_current2, clean, raf, t);
          if (raf) _current2.t = request(fn);else fn();
        }
      }
    });
  });
  var useEffect = effect(true);
  var useLayoutEffect = effect(false);

  var id$3 = uid();
  setup.push(stacked(id$3));
  var ref = (function (value) {
    var _unstacked = unstacked(id$3),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown;

    if (unknown) {
      var info = {
        current: null
      };
      stack.push(info);
      info.current = $(value, empty);
    }

    return stack[i];
  });

  var id$4 = uid();
  setup.push(stacked(id$4));
  var useMemo = (function (callback, refs) {
    var _unstacked = unstacked(id$4),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown;

    var comp = refs || empty;
    if (unknown) create$1(stack, -1, callback, comp);
    var _stack$i = stack[i],
        filter = _stack$i.filter,
        value = _stack$i.value,
        fn = _stack$i.fn,
        inputs = _stack$i.inputs;
    return (filter ? diff(inputs, comp) : callback !== fn) ? create$1(stack, i, callback, comp) : value;
  });

  var create$1 = function create(stack, i, fn, inputs) {
    var info = {
      filter: inputs !== empty,
      value: null,
      fn: fn,
      inputs: inputs
    };
    if (i < 0) stack.push(info);else stack[i] = info;
    info.value = fn();
    return info.value;
  };

  var callback = (function (fn, inputs) {
    return useMemo(function () {
      return fn;
    }, inputs);
  });

  var id$5 = uid();
  setup.push(stacked(id$5));
  var useReducer = (function (reducer, value) {
    var _unstacked = unstacked(id$5),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown,
        update = _unstacked.update;

    if (unknown) {
      var info = [null, function (action) {
        value = reducer(value, action);
        info[0] = value;
        update();
      }];
      stack.push(info);
      info[0] = $(value, empty);
    }

    return stack[i];
  });

  var state = (function (value) {
    return useReducer(function (_, value) {
      return $(value, [_]);
    }, value);
  });

  var all = new WeakMap();
  var id$6 = uid();
  setup.push(stacked(id$6));
  var createContext = function createContext(value) {
    var context = {
      value: value,
      provide: provide
    };
    all.set(context, []);
    return context;
  };
  var useContext = function useContext(context) {
    var _unstacked = unstacked(id$6),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown,
        update = _unstacked.update;

    if (unknown) {
      all.get(context).push(update);
      stack.push(context);
    }

    return stack[i].value;
  };

  function provide(value) {
    if (this.value !== value) {
      this.value = value;

      for (var arr = all.get(this), length = arr.length, i = 0; i < length; i++) {
        arr[i]();
      }
    }
  }

  /*! (c) Andrea Giammarchi */
  function disconnected(poly) {

    var CONNECTED = 'connected';
    var DISCONNECTED = 'dis' + CONNECTED;
    var Event = poly.Event;
    var WeakSet = poly.WeakSet;
    var notObserving = true;
    var observer = new WeakSet();
    return function observe(node) {
      if (notObserving) {
        notObserving = !notObserving;
        startObserving(node.ownerDocument);
      }

      observer.add(node);
      return node;
    };

    function startObserving(document) {
      var dispatched = null;

      try {
        new MutationObserver(changes).observe(document, {
          subtree: true,
          childList: true
        });
      } catch (o_O) {
        var timer = 0;
        var records = [];

        var reschedule = function reschedule(record) {
          records.push(record);
          clearTimeout(timer);
          timer = setTimeout(function () {
            changes(records.splice(timer = 0, records.length));
          }, 0);
        };

        document.addEventListener('DOMNodeRemoved', function (event) {
          reschedule({
            addedNodes: [],
            removedNodes: [event.target]
          });
        }, true);
        document.addEventListener('DOMNodeInserted', function (event) {
          reschedule({
            addedNodes: [event.target],
            removedNodes: []
          });
        }, true);
      }

      function changes(records) {
        dispatched = new Tracker();

        for (var record, length = records.length, i = 0; i < length; i++) {
          record = records[i];
          dispatchAll(record.removedNodes, DISCONNECTED, CONNECTED);
          dispatchAll(record.addedNodes, CONNECTED, DISCONNECTED);
        }

        dispatched = null;
      }

      function dispatchAll(nodes, type, counter) {
        for (var node, event = new Event(type), length = nodes.length, i = 0; i < length; (node = nodes[i++]).nodeType === 1 && dispatchTarget(node, event, type, counter)) {
        }
      }

      function dispatchTarget(node, event, type, counter) {
        if (observer.has(node) && !dispatched[type].has(node)) {
          dispatched[counter].delete(node);
          dispatched[type].add(node);
          node.dispatchEvent(event);
          /*
          // The event is not bubbling (perf reason: should it?),
          // hence there's no way to know if
          // stop/Immediate/Propagation() was called.
          // Should DOM Level 0 work at all?
          // I say it's a YAGNI case for the time being,
          // and easy to implement in user-land.
          if (!event.cancelBubble) {
            var fn = node['on' + type];
            if (fn)
              fn.call(node, event);
          }
          */
        }

        for (var // apparently is node.children || IE11 ... ^_^;;
        // https://github.com/WebReflection/disconnected/issues/1
        children = node.children || [], length = children.length, i = 0; i < length; dispatchTarget(children[i++], event, type, counter)) {
        }
      }

      function Tracker() {
        this[CONNECTED] = new WeakSet();
        this[DISCONNECTED] = new WeakSet();
      }
    }
  }

  var find = function find(node) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var i = 0;

    while (i < length) {
      var child = childNodes[i++];
      if (child.nodeType === 1) return child;
    }

    throw 'unobservable';
  };

  var observe = disconnected({
    Event: CustomEvent$1,
    WeakSet: WeakSet$1
  });

  var observer = function observer($, element) {
    var nodeType = element.nodeType;

    if (nodeType) {
      var node = nodeType === 1 ? element : find(element);
      observe(node);
      var handler = {
        handleEvent: handleEvent,
        onconnected: onconnected,
        ondisconnected: ondisconnected,
        $: $,
        _: null
      };
      node.addEventListener('connected', handler, false);
      node.addEventListener('disconnected', handler, false);
    } else {
      var value = element.valueOf(); // give a chance to facades to return a reasonable value

      if (value !== element) observer($, value);
    }
  };

  var useEffect$1 = function useEffect$$1(fn, inputs) {
    var args = [fn];
    if (inputs) // if the inputs is an empty array
      // observe the returned element for connect/disconnect events
      // and invoke effects/cleanup on these events only
      args.push(inputs.length ? inputs : observer);
    return useEffect.apply(null, args);
  };

  function handleEvent(e) {
    this['on' + e.type]();
  }

  function onconnected() {
    ondisconnected.call(this);
    this._ = this.$();
  }

  function ondisconnected() {
    var _ = this._;
    this._ = null;
    if (_) _();
  }

  exports.default = augmentor;
  exports.createContext = createContext;
  exports.useCallback = callback;
  exports.useContext = useContext;
  exports.useEffect = useEffect$1;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = ref;
  exports.useState = state;

  return exports;

}({}));
