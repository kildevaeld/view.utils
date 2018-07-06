(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.viewjs = global.viewjs || {}, global.viewjs.utils = {})));
}(this, (function (exports) { 'use strict';

    function callFunc(fn, args = []) {
        let l = fn.length,
            i = -1,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2],
            a4 = args[3],
            a5 = args[4];
        switch (args.length) {
            case 0:
                while (++i < l) fn[i].handler.call(fn[i].ctx);
                return;
            case 1:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1);
                return;
            case 2:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2);
                return;
            case 3:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3);
                return;
            case 4:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
                return;
            case 5:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5);
                return;
            default:
                while (++i < l) fn[i].handler.apply(fn[i].ctx, args);
                return;
        }
    }
    function callFuncCtx(fn, args = [], ctx) {
        if (!Array.isArray(fn)) fn = [fn];
        let l = fn.length,
            i = -1,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2],
            a4 = args[3],
            a5 = args[4];
        switch (args.length) {
            case 0:
                while (++i < l) fn[i].call(ctx);
                return;
            case 1:
                while (++i < l) fn[i].call(ctx, a1);
                return;
            case 2:
                while (++i < l) fn[i].call(ctx, a1, a2);
                return;
            case 3:
                while (++i < l) fn[i].call(ctx, a1, a2, a3);
                return;
            case 4:
                while (++i < l) fn[i].call(ctx, a1, a2, a3, a4);
                return;
            case 5:
                while (++i < l) fn[i].call(ctx, a1, a2, a3, a4, a5);
                return;
            default:
                while (++i < l) fn[i].apply(ctx, args);
                return;
        }
    }
    function result(obj, prop, ...args) {
        if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
        return obj[prop];
    }
    function getOption(option, objs, resolve = false) {
        for (let i = 0, ii = objs.length; i < ii; i++) {
            if (isObjectLike(objs[i]) && has(objs[i], option)) {
                return resolve ? result(objs[i], option) : objs[i][option];
            }
        }
        return void 0;
    }
    /**
     * Trigger an event on an object, if it's an eventemitter,
     * will also call an method "on<EventName>" if it's exists
     *
     * @export
     * @template T
     * @param {T} self
     * @param {string} eventName
     * @param {...any[]} args
     */
    function triggerMethodOn(self, eventName, ...args) {
        const ev = camelcase("on-" + eventName.replace(':', '-'));
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
        return val != null && typeof val === 'object' && Array.isArray(val) === false;
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
        return input != null && typeof input === 'object' && input.nodeType === Node.ELEMENT_NODE && typeof input.style === 'object' && typeof input.ownerDocument === 'object';
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
    function extend(obj, ...args) {
        if (!isObject(obj)) return obj;
        for (let i = 0, ii = args.length; i < ii; i++) {
            const o = args[i];
            if (!isObject(o)) continue;
            for (const k in o) {
                if (has(o, k)) obj[k] = o[k];
            }
        }
        return obj;
    }
    const _has = Object.prototype.hasOwnProperty;
    function has(obj, prop) {
        return _has.call(obj, prop);
    }
    function camelcase(input) {
        return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
            return group1.toUpperCase();
        });
    }
    var idCounter = 0;
    function uniqueId(prefix = "") {
        return prefix + ++idCounter;
    }
    function indexOf(array, item) {
        for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
        return -1;
    }

    function equal(a, b) {
        return eq(a, b, [], []);
    }
    const toString = Object.prototype.toString;
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
        if (typeof a != 'object' || typeof b != 'object') return false;
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

    exports.callFunc = callFunc;
    exports.callFuncCtx = callFuncCtx;
    exports.result = result;
    exports.getOption = getOption;
    exports.triggerMethodOn = triggerMethodOn;
    exports.isObjectLike = isObjectLike;
    exports.isObject = isObject;
    exports.isPlainObject = isPlainObject;
    exports.isFunction = isFunction;
    exports.isConstructor = isConstructor;
    exports.isString = isString;
    exports.isElement = isElement;
    exports.isNumber = isNumber;
    exports.isNumeric = isNumeric;
    exports.extend = extend;
    exports.has = has;
    exports.camelcase = camelcase;
    exports.uniqueId = uniqueId;
    exports.indexOf = indexOf;
    exports.equal = equal;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
