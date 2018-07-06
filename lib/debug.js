"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const types_1 = require("./types");
exports.debug = localStorage && localStorage.getItem("viewjs.debug") != null
    ? (namespace) => (...args) => {
        const l = args.length;
        if (l && utils_1.isString(args[0])) {
            args[0] = namespace + ' ' + args[0];
        }
        else if (l) {
            args.unshift(namespace);
        }
        else
            return;
        console.log(...args.map(m => (utils_1.isObject(m) && m instanceof types_1.Base) ? String(m) : m));
    }
    : (_) => () => { };
