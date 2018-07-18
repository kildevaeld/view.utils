var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Base = function () {
    function Base() {
        classCallCheck(this, Base);
    }

    createClass(Base, [{
        key: 'destroy',
        value: function destroy() {}
    }]);
    return Base;
}();

Base.inherit = inherit;
// Because IE/edge stinks!
var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
    return !!~indexOf(nodeList, this);
};
function matches(elm, selector) {
    return matchesSelector.call(elm, selector);
}
function getGlobal() {
    return Function('return this')();
}
function callFunc(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var l = fn.length,
        i = -1,
        a1 = args[0],
        a2 = args[1],
        a3 = args[2],
        a4 = args[3],
        a5 = args[4];
    switch (args.length) {
        case 0:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx);
            }return;
        case 1:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1);
            }return;
        case 2:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2);
            }return;
        case 3:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
            }return;
        case 4:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
            }return;
        case 5:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5);
            }return;
        default:
            while (++i < l) {
                fn[i].handler.apply(fn[i].ctx, args);
            }return;
    }
}
function callFuncCtx(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var ctx = arguments[2];

    if (!Array.isArray(fn)) fn = [fn];
    var l = fn.length,
        i = -1,
        a1 = args[0],
        a2 = args[1],
        a3 = args[2],
        a4 = args[3],
        a5 = args[4];
    switch (args.length) {
        case 0:
            while (++i < l) {
                fn[i].call(ctx);
            }return;
        case 1:
            while (++i < l) {
                fn[i].call(ctx, a1);
            }return;
        case 2:
            while (++i < l) {
                fn[i].call(ctx, a1, a2);
            }return;
        case 3:
            while (++i < l) {
                fn[i].call(ctx, a1, a2, a3);
            }return;
        case 4:
            while (++i < l) {
                fn[i].call(ctx, a1, a2, a3, a4);
            }return;
        case 5:
            while (++i < l) {
                fn[i].call(ctx, a1, a2, a3, a4, a5);
            }return;
        default:
            while (++i < l) {
                fn[i].apply(ctx, args);
            }return;
    }
}
function result(obj, prop) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
    return obj[prop];
}
function getOption(option, objs) {
    var resolve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    for (var i = 0, ii = objs.length; i < ii; i++) {
        if (isObjectLike(objs[i]) && objs[i][option]) {
            return resolve ? result(objs[i], option) : objs[i][option];
        }
    }
    return void 0;
}
/**
 * Trigger an event on an object, if it's an eventemitter.
 * Will also call an method "on<EventName>" if it's exists
 *
 * @export
 * @template T
 * @param {T} self
 * @param {string} eventName
 * @param {...any[]} args
 */
function triggerMethodOn(self, eventName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
    }

    var ev = camelcase("on-" + eventName.replace(':', '-'));
    if (self[ev] && typeof self[ev] === 'function') {
        callFunc([{
            handler: self[ev],
            ctx: self
        }], args);
    }
    if (isFunction(self.trigger)) {
        args = [eventName].concat(args);
        callFunc([{
            handler: self.trigger,
            ctx: self
        }], args);
    }
}
function isObjectLike(val) {
    return val === Object(val);
}
function isObject(val) {
    return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
}
function isObjectObject(o) {
    return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}
function isPlainObject(o) {
    var ctor, prot;
    if (isObjectObject(o) === false) return false;
    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function') return false;
    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;
    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
    // Most likely a plain Object
    return true;
}
function isFunction(a) {
    return typeof a === 'function';
}
function isConstructor(a) {
    try {
        Reflect.construct(String, [], a);
    } catch (e) {
        return false;
    }
    return true;
}
function isString(a) {
    return typeof a === 'string';
}
function isElement(input) {
    if (!input) return false;else if (input instanceof Element) return true;
    return input != null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.nodeType === Node.ELEMENT_NODE && _typeof(input.style) === 'object' && _typeof(input.ownerDocument) === 'object';
}
function isNumber(num) {
    return typeof num === 'number';
}
function isNumeric(num) {
    if (typeof num === 'number') {
        return num - num === 0;
    }
    if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
}
function extend(obj) {
    if (!isObject(obj)) return obj;

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    for (var i = 0, ii = args.length; i < ii; i++) {
        var o = args[i];
        if (!isObject(o)) continue;
        for (var k in o) {
            if (has(o, k)) obj[k] = o[k];
        }
    }
    return obj;
}
var _has = Object.prototype.hasOwnProperty,
    _slice = Array.prototype.slice;
function has(obj, prop) {
    return _has.call(obj, prop);
}
function slice(obj, start, len) {
    return _slice.call(obj, start, len);
}
function camelcase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
}
var idCounter = 0;
function uniqueId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return prefix + ++idCounter;
}
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === item) return i;
    }return -1;
}
function inherit(protoProps, staticProps) {
    var parent = this;
    var child;
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `protoProps` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function child() {
            return parent.apply(this, arguments);
        };
    }
    // Add static properties to the constructor function, if supplied.
    Object.assign(child, parent, staticProps);
    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = create(parent.prototype, protoProps);
    child.prototype.constructor = child;
    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
    return child;
}
var nativeCreate = Object.create;
function Ctor() {}
function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result;
}
function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) Object.assign(result, props);
    return result;
}
function noop() {}

function equal(a, b) {
    return eq(a, b, [], []);
}
var toString = Object.prototype.toString;
function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
        // Strings, numbers, dates, and booleans are compared by value.
        case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return a == String(b);
        case '[object Number]':
            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
            // other numeric values.
            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
        case '[object Date]':
        case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a == +b;
        // RegExps are compared by their source patterns and flags.
        case '[object RegExp]':
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
    }
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor,
        bCtor = b.constructor;
    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
        return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0,
        result$$1 = true;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
        // Compare array lengths to determine if a deep comparison is necessary.
        size = a.length;
        result$$1 = size === b.length;
        if (result$$1) {
            // Deep compare the contents, ignoring non-numeric properties.
            while (size--) {
                if (!(result$$1 = eq(a[size], b[size], aStack, bStack))) break;
            }
        }
    } else {
        // Deep compare objects.
        for (var key in a) {
            if (has(a, key)) {
                // Count the expected number of properties.
                size++;
                // Deep compare each member.
                if (!(result$$1 = has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
            }
        }
        // Ensure that both objects contain the same number of properties.
        if (result$$1) {
            for (key in b) {
                if (has(b, key) && !size--) break;
            }
            result$$1 = !size;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result$$1;
}

var hasReflect = typeof Reflect !== 'undefined' && isFunction(Reflect.construct);
var defaultInvoker = {
    get: function get(V) {
        if (hasReflect) return Reflect.construct(V, []);
        return new V();
    }
};
var Invoker = defaultInvoker;
/**
 * Set current  invoker.
 * If `i` is undefined, the defaultInvoker will be used
 *
 * @export
 * @param {IInvoker} [i]
 */
function setInvoker(i) {
    if (!i) i = defaultInvoker;
    Invoker = i;
}

var global$1 = getGlobal();
//
var debug = global$1.localStorage && global$1.localStorage.getItem("viewjs.debug") != null ? function (namespace) {
    return function () {
        var _console;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var l = args.length;
        if (l && isString(args[0])) {
            args[0] = namespace + ' ' + args[0];
        } else if (l) {
            args.unshift(namespace);
        } else return;
        (_console = console).log.apply(_console, toConsumableArray(args.map(function (m) {
            return isObject(m) && m instanceof Base ? String(m) : m;
        })));
    };
} : function (_) {
    return noop;
};

export { matches, getGlobal, callFunc, callFuncCtx, result, getOption, triggerMethodOn, isObjectLike, isObject, isPlainObject, isFunction, isConstructor, isString, isElement, isNumber, isNumeric, extend, has, slice, camelcase, uniqueId, indexOf, inherit, noop, Base, equal, Invoker, setInvoker, debug };
