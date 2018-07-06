import { Call, Callback, Constructor } from './types';
export declare function matches(elm: Element, selector: string): boolean;
export declare function getGlobal(): any;
export declare function callFunc(fn: Call[], args?: any[]): void;
export declare function callFuncCtx(fn: Callback[] | Callback, args?: any[], ctx?: any): void;
export declare function result<T>(obj: any, prop: string, ...args: any[]): T | undefined;
export declare function getOption<T>(option: string, objs: any[], resolve?: boolean): T | undefined;
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
export declare function isObjectLike(val: any): val is object;
export declare function isObject(val: any): val is object;
export declare function isPlainObject(o: any): o is object;
export declare function isFunction(a: any): a is Function;
export declare function isConstructor<T = {}>(a: any): a is Constructor<T>;
export declare function isString(a: any): a is string;
export declare function isElement(input: any): input is Element;
export declare function isNumber(num: any): num is number;
export declare function isNumeric(num: any): num is number;
export declare function extend<T extends Object, U extends Object>(obj: T, ...args: U[]): T & U;
export declare function has(obj: Object, prop: string): boolean;
export declare function slice<T>(obj: ArrayLike<T>, start?: number, len?: number): T[];
export declare function camelcase(input: string): string;
export declare function uniqueId(prefix?: string): string;
export declare function indexOf<T>(array: ArrayLike<T>, item: T): number;
