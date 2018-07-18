import { Constructor } from './types';
/**
 * Used  everywhere as a factory for constructing  instances
 *
 * @export
 * @interface IInvoker
 */
export interface IInvoker {
    get<T>(key: Constructor<T>): T;
}
export declare var Invoker: {
    get<T>(V: Constructor<T>): T;
};
/**
 * Set current  invoker.
 * If `i` is undefined, the defaultInvoker will be used
 *
 * @export
 * @param {IInvoker} [i]
 */
export declare function setInvoker(i?: IInvoker): void;
