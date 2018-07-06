import { isString, isObject } from './utils';
import { Base } from './types';



export const debug = localStorage && localStorage.getItem("viewjs.debug") != null
    ? (namespace: string) => (...args: any[]) => {
        const l = args.length;
        if (l && isString(args[0])) {
            args[0] = namespace + ' ' + args[0];
        } else if (l) {
            args.unshift(namespace);
        } else return;

        console.log(...args.map(m => (isObject(m) && m instanceof Base) ? String(m) : m))
    }
    : (_: string) => () => { }