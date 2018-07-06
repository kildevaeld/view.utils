

export class Base {
    destroy() { }
}

export type Constructor<T> = new (...args: any[]) => T;

export type Callback = (...args: any[]) => void;

export interface Call {
    ctx?: any
    handler: Callback;
}