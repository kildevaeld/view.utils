"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGlobal() {
    return Function('return this')();
}
exports.getGlobal = getGlobal;
function callFunc(fn, args = []) {
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3], a5 = args[4];
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
function callFuncCtx(fn, args = [], ctx) {
    if (!Array.isArray(fn))
        fn = [fn];
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3], a5 = args[4];
    switch (args.length) {
        case 0:
            while (++i < l)
                fn[i].call(ctx);
            return;
        case 1:
            while (++i < l)
                fn[i].call(ctx, a1);
            return;
        case 2:
            while (++i < l)
                fn[i].call(ctx, a1, a2);
            return;
        case 3:
            while (++i < l)
                fn[i].call(ctx, a1, a2, a3);
            return;
        case 4:
            while (++i < l)
                fn[i].call(ctx, a1, a2, a3, a4);
            return;
        case 5:
            while (++i < l)
                fn[i].call(ctx, a1, a2, a3, a4, a5);
            return;
        default:
            while (++i < l)
                fn[i].apply(ctx, args);
            return;
    }
}
exports.callFuncCtx = callFuncCtx;
function result(obj, prop, ...args) {
    if (isFunction(obj[prop]))
        return obj[prop].apply(obj, args);
    return obj[prop];
}
exports.result = result;
function getOption(option, objs, resolve = false) {
    for (let i = 0, ii = objs.length; i < ii; i++) {
        if (isObjectLike(objs[i]) && has(objs[i], option)) {
            return resolve ? result(objs[i], option) : objs[i][option];
        }
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
exports.triggerMethodOn = triggerMethodOn;
function isObjectLike(val) {
    return val === Object(val);
}
exports.isObjectLike = isObjectLike;
function isObject(val) {
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
function isConstructor(a) {
    try {
        Reflect.construct(String, [], a);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isConstructor = isConstructor;
function isString(a) {
    return typeof a === 'string';
}
exports.isString = isString;
function isElement(input) {
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
function isNumber(num) {
    return typeof num === 'number';
}
exports.isNumber = isNumber;
function isNumeric(num) {
    if (typeof num === 'number') {
        return num - num === 0;
    }
    if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
}
exports.isNumeric = isNumeric;
function extend(obj, ...args) {
    if (!isObject(obj))
        return obj;
    for (let i = 0, ii = args.length; i < ii; i++) {
        const o = args[i];
        if (!isObject(o))
            continue;
        for (const k in o) {
            if (has(o, k))
                obj[k] = o[k];
        }
    }
    return obj;
}
exports.extend = extend;
const _has = Object.prototype.hasOwnProperty, _slice = Array.prototype.slice;
function has(obj, prop) {
    return _has.call(obj, prop);
}
exports.has = has;
function slice(obj, start, len) {
    return _slice.call(obj, start, len);
}
exports.slice = slice;
function camelcase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
}
exports.camelcase = camelcase;
;
var idCounter = 0;
function uniqueId(prefix = "") {
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
