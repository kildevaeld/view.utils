"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const hasReflect = typeof Reflect !== 'undefined' && utils_1.isFunction(Reflect.construct);
const defaultInvoker = {
    get(V) {
        if (hasReflect)
            return Reflect.construct(V, []);
        return new V();
    }
};
exports.Invoker = defaultInvoker;
/**
 * Set current  invoker.
 * If `i` is undefined, the defaultInvoker will be used
 *
 * @export
 * @param {IInvoker} [i]
 */
function setInvoker(i) {
    if (!i)
        i = defaultInvoker;
    exports.Invoker = i;
}
exports.setInvoker = setInvoker;
