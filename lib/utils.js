"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function callFunc(fn, args) {
    if (args === void 0) { args = []; }
    var l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3], a5 = args[4];
    switch (args.length) {
        case 0:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx);
            return;
        case 1:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1);
            return;
        case 2:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2);
            return;
        case 3:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
            return;
        case 4:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
            return;
        case 5:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5);
            return;
        default:
            while (++i < l)
                fn[i].handler.apply(fn[i].ctx, args);
            return;
    }
}
exports.callFunc = callFunc;
function result(obj, prop) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (isFunction(obj[prop]))
        return obj[prop].apply(obj, args);
    return obj[prop];
}
exports.result = result;
function getOption(option, objs) {
    for (var i = 0, ii = objs.length; i < ii; i++) {
        if (isObject(objs[i]) && objs[i][option])
            return objs[i][option];
    }
    return void 0;
}
exports.getOption = getOption;
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
function triggerMethodOn(self, eventName) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
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
exports.triggerMethodOn = triggerMethodOn;
function isObject(val) {
    //return obj === Object(obj);
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
exports.isObject = isObject;
function isObjectObject(o) {
    return isObject(o) === true
        && Object.prototype.toString.call(o) === '[object Object]';
}
function isPlainObject(o) {
    var ctor, prot;
    if (isObjectObject(o) === false)
        return false;
    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function')
        return false;
    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false)
        return false;
    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
    // Most likely a plain Object
    return true;
}
exports.isPlainObject = isPlainObject;
function isFunction(a) {
    return typeof a === 'function';
}
exports.isFunction = isFunction;
function isString(a) {
    return typeof a === 'string';
}
exports.isString = isString;
function isElement(input) {
    //return a instanceof Element;
    if (!input)
        return false;
    else if (input instanceof Element)
        return true;
    return (input != null)
        && (typeof input === 'object')
        && (input.nodeType === Node.ELEMENT_NODE)
        && (typeof input.style === 'object')
        && (typeof input.ownerDocument === 'object');
}
exports.isElement = isElement;
function extend(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!isObject(obj))
        return obj;
    for (var i = 0, ii = args.length; i < ii; i++) {
        var o = args[i];
        if (!isObject(o))
            continue;
        for (var k in o) {
            if (has(o, k))
                obj[k] = o[k];
        }
    }
    return obj;
}
exports.extend = extend;
var _has = Object.prototype.hasOwnProperty;
function has(obj, prop) {
    return _has.call(obj, prop);
}
exports.has = has;
function camelcase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
}
exports.camelcase = camelcase;
;
var idCounter = 0;
function uniqueId(prefix) {
    if (prefix === void 0) { prefix = ""; }
    return prefix + (++idCounter);
}
exports.uniqueId = uniqueId;
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++)
        if (array[i] === item)
            return i;
    return -1;
}
exports.indexOf = indexOf;
