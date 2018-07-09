export declare class Base {
    destroy(): void;
}
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type Callback = (...args: any[]) => void;
export interface Call {
    ctx?: any;
    handler: Callback;
}
