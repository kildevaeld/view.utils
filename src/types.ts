
export type Constructor<T> = new (...args: any[]) => T;

export type Callback = (...args: any[]) => void;

export interface Call {
    ctx?: any
    handler: Callback;
}

export interface Destroyable {
    destroy(): this;
}


export interface Subscription {
    unsubscribe(): void;
}

export interface Subscribable<T> {
    subscribe(next: (value: T | null) => any, error?: (err: Error) => any, completed?: () => any): Subscription;
}