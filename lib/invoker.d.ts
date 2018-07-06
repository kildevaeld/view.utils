import { Constructor } from './types';
export interface IInvoker {
    get<T>(key: Constructor<T>): T;
}
export declare var Invoker: {
    get<T>(V: Constructor<T>): T;
};
export declare function setInvoker(i?: IInvoker): void;
