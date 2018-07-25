import { Call, Callback, Constructor, Destroyable } from './types';

export class Base implements Destroyable {
    static inherit = inherit;
    destroy(): this {
        return this;
    }
}

// Because IE/edge stinks!
const ElementProto: any = (typeof Element !== 'undefined' && Element.prototype) || {};

const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (this: Element, selector: string) {
        var nodeList = ((this.parentNode || document) as Element).querySelectorAll(selector) || [];
        return !!~indexOf(nodeList, this);
    };


export function matches(elm: Element, selector: string): boolean {
    return matchesSelector.call(elm, selector)
}


export function getGlobal() {
    return Function('return this')();
}

export function callFunc(fn: Call[], args: any[] = []) {

    let l = fn.length, i = -1, a1 = args[0], a2 = args[1],
        a3 = args[2], a4 = args[3], a5 = args[4];
    switch (args.length) {
        case 0: while (++i < l) fn[i].handler.call(fn[i].ctx); return;
        case 1: while (++i < l) fn[i].handler.call(fn[i].ctx, a1); return;
        case 2: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2); return;
        case 3: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3); return;
        case 4: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4); return;
        case 5: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5); return;
        default: while (++i < l) fn[i].handler.apply(fn[i].ctx, args); return;
    }
}

export function callFuncCtx(fn: Callback[] | Callback, args: any[] = [], ctx?: any) {
    if (!Array.isArray(fn)) fn = [fn]
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1],
        a3 = args[2], a4 = args[3], a5 = args[4];
    switch (args.length) {
        case 0: while (++i < l) fn[i].call(ctx); return;
        case 1: while (++i < l) fn[i].call(ctx, a1); return;
        case 2: while (++i < l) fn[i].call(ctx, a1, a2); return;
        case 3: while (++i < l) fn[i].call(ctx, a1, a2, a3); return;
        case 4: while (++i < l) fn[i].call(ctx, a1, a2, a3, a4); return;
        case 5: while (++i < l) fn[i].call(ctx, a1, a2, a3, a4, a5); return;
        default: while (++i < l) fn[i].apply(ctx, args); return;
    }
}

export function result<T>(obj: any, prop: string, ...args: any[]): T | undefined {
    if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
    return obj[prop];
}

export function getOption<T>(option: string, objs: any[], resolve: boolean = false): T | undefined {
    for (let i = 0, ii = objs.length; i < ii; i++) {
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
export function triggerMethodOn<T extends any>(self: T, eventName: string, ...args: any[]) {
    const ev = camelcase("on-" + eventName.replace(':', '-'))

    if ((<any>self)[ev] && typeof (<any>self)[ev] === 'function') {
        callFunc([{
            handler: (<any>self)[ev],
            ctx: self
        } as any], args);
    }

    if (isFunction((<any>self).trigger)) {
        args = [eventName].concat(args)
        callFunc([{
            handler: (<any>self).trigger,
            ctx: self
        }], args);
    }
}

export function isObjectLike(val: any): val is object {
    return val === Object(val);
}

export function isObject(val: any): val is object {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function isObjectObject(o: any) {
    return isObject(o) === true
        && Object.prototype.toString.call(o) === '[object Object]';
}

export function isPlainObject(o: any): o is object {
    var ctor: any, prot: any;

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

export function isFunction(a: any): a is Function {
    return typeof a === 'function';
}

export function isConstructor<T = {}>(a: any): a is Constructor<T> {
    try {
        Reflect.construct(String, [], a);
    } catch (e) {
        return false;
    }
    return true;
}

export function isDestroyable(a: any): a is Destroyable {
    return a && isFunction(a.destroy);
}

export function isString(a: any): a is string {
    return typeof a === 'string';
}

export function isElement(input: any): input is Element {
    if (!input) return false;
    else if (input instanceof Element) return true;
    return (input != null)
        && (typeof input === 'object')
        && (input.nodeType === Node.ELEMENT_NODE)
        && (typeof input.style === 'object')
        && (typeof input.ownerDocument === 'object');
}

export function isNumber(num: any): num is number {
    return typeof num === 'number';
}

export function isNumeric(num: any): num is number {
    if (typeof num === 'number') {
        return num - num === 0;
    }
    if (typeof num === 'string' && num.trim() !== '') {
        return (Number as any).isFinite ? (Number as any).isFinite(+num) : isFinite(+num);
    }
    return false;
}

export function extend<T extends Object, U extends Object>(obj: T, ...args: U[]): T & U {
    if (!isObject(obj)) return obj

    for (let i = 0, ii = args.length; i < ii; i++) {
        const o = args[i];
        if (!isObject(o)) continue
        for (const k in o) {
            if (has(o, k)) (<any>obj)[k] = o[k] as any
        }
    }
    return obj as T & U;
}

const _has = Object.prototype.hasOwnProperty,
    _slice = Array.prototype.slice;

export function has(obj: Object, prop: string): boolean {
    return _has.call(obj, prop)
}

export function slice<T>(obj: ArrayLike<T>, start?: number, len?: number): T[] {
    return _slice.call(obj, start, len)
}

export function camelcase(input: string): string {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
};

var idCounter = 0;
export function uniqueId(prefix: string = "") {
    return prefix + (++idCounter)
}

export function indexOf<T>(array: ArrayLike<T>, item: T): number {
    for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
    return -1;
}


export type Properties = { [key: string]: any }

export interface ConstructorWithSuper<T, S> {
    new(...args: any[]): T;
    __super__: S
}

export function inherit<
    T,
    Proto extends Properties,
    P extends Properties,
    S extends Properties
    >(this: Constructor<T>, protoProps: P, staticProps?: S): Constructor<T> & ConstructorWithSuper<P, T> {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `protoProps` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function (this: {}) { return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    Object.assign(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    (child as any).__super__ = parent.prototype;

    return child as any;
};


const nativeCreate = Object.create;
function Ctor() { };

function baseCreate(prototype: any) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new (Ctor as any);
    Ctor.prototype = null;
    return result;
};


function create(prototype: any, props: any) {
    var result = baseCreate(prototype);
    if (props) Object.assign(result, props);
    return result;
}


export function noop() { }

export function destroy(a: any) {
    if (isDestroyable(a)) a.destroy();
}