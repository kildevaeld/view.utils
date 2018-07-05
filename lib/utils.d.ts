export interface Call {
    ctx?: any;
    handler: (...args: any[]) => void;
}
export declare function callFunc(fn: Call[], args?: any[]): void;
export declare function result(obj: any, prop: string, ...args: any[]): any;
export declare function getOption<T>(option: string, objs: any[]): T | undefined;
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
export declare function triggerMethodOn<T extends any>(self: T, eventName: string, ...args: any[]): void;
export declare function isObject(val: any): val is object;
export declare function isPlainObject(o: any): o is object;
export declare function isFunction(a: any): a is Function;
export declare function isString(a: any): a is string;
export declare function isElement(input: any): input is Element;
export declare function extend<T extends Object, U extends Object>(obj: T, ...args: U[]): T & U;
export declare function has(obj: Object, prop: string): boolean;
export declare function camelcase(input: string): string;
export declare function uniqueId(prefix?: string): string;
export declare function indexOf<T>(array: ArrayLike<T>, item: T): number;
