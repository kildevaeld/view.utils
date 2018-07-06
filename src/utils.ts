
export interface Call {
    ctx?: any
    handler: (...args: any[]) => void;
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

export function result<T>(obj: any, prop: string, ...args: any[]): T | undefined {
    if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
    return obj[prop];
}

export function getOption<T>(option: string, objs: any[], resolve: boolean = false): T | undefined {
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

export function isConstructor(a: any): a is Function {
    try {
        Reflect.construct(String, [], a);
    } catch (e) {
        return false;
    }
    return true;
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

const _has = Object.prototype.hasOwnProperty;
export function has(obj: Object, prop: string): boolean {
    return _has.call(obj, prop)
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