import * as TypeScript from "typescript";

import { setTimeout as __setTimeout } from "./timers.js";
import { cloneJSON } from "./clonejson.js";
import { GameTestFetch, FunctionToString } from "./GameTestFetch.js";

/**
 * get time
 * @returns Date string
 */
const getTime = (): string => {
    const date = new Date();
    const datetime = [date.getHours(), date.getMinutes(), date.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));

    return datetime.join(':') + "." + date.getMilliseconds();
};

/**
 * The following modifies NodeJS environment to create a minecraft-js / QuickJS virural environment
 */
let _console = globalThis.console;
let _Buffer = globalThis.Buffer;
let _setTimeout = globalThis.setTimeout;
let _clearTimeout = globalThis.clearTimeout;
let _setInterval = globalThis.setInterval;
let _clearInterval = globalThis.clearInterval;
let _setImmediate = globalThis.setImmediate;
let _clearImmediate = globalThis.clearImmediate;

class console {
    static info(...data: any[]): void { _console.info(`[${getTime()}]`, ...data) };
    static log(...data: any[]): void { _console.log(`[${getTime()}]`, ...data) };
    static warn(...data: any[]): void { _console.warn(`[${getTime()}]`, ...data) };
    static error(...data: any[]): void { _console.error(`[${getTime()}]`, ...data) };
};

function InternalError (arg: any): string {
    if (!!arg) return `InternalError: ${arg}`;
    return `InternalError`;
}
function AggregateError (arg: any, arg2: any): string {
    if (!!arg2) return `AggregateError: ${arg2}`;
    return `AggregateError`;
}
let __date_clock = () => Number(Date.now() + "000");
let toolsVersion = "4.6";
BigInt = undefined;
Buffer = undefined;
// @ts-ignore
setTimeout = undefined;
// @ts-ignore
clearTimeout = undefined;
// @ts-ignore
setInterval = undefined;
// @ts-ignore
clearInterval = undefined;
// @ts-ignore
setImmediate = undefined;
// @ts-ignore
clearImmediate = undefined;
let print = console.log;

// Modules to test
const TestModules: [string, any][] = [
    // GameTest native modules
    ["Object", Object],
    ["Function", Function],
    ["Error", Error],
    ["EvalError", EvalError],
    ["RangeError", RangeError],
    ["ReferenceError", ReferenceError],
    ["SyntaxError", SyntaxError],
    ["TypeError", TypeError],
    ["URIError", URIError],
    ["InternalError", InternalError],
    ["AggregateError", AggregateError],
    ["Array", Array],
    ["parseInt", parseInt],
    ["parseFloat", parseFloat],
    ["isNaN", isNaN],
    ["isFinite", isFinite],
    ["decodeURI", decodeURI],
    ["decodeURIComponent", decodeURIComponent],
    ["encodeURI", encodeURI],
    ["encodeURIComponent", encodeURIComponent],
    ["escape", escape],
    ["unescape", unescape],
    ["Infinity", Infinity],
    ["NaN", NaN],
    ["undefined", undefined],
    ["__date_clock", __date_clock],
    ["Number", Number],
    ["Boolean", Boolean],
    ["String", String],
    ["Math", Math],
    ["Reflect", Reflect],
    ["Symbol", Symbol],
    ["eval", eval],
    ["globalThis", globalThis],
    ["Date", Date],
    ["RegExp", RegExp],
    ["JSON", JSON],
    ["Proxy", Proxy],
    ["Map", Map],
    ["Set", Set],
    ["WeakMap", WeakMap],
    ["WeakSet", WeakSet],
    ["ArrayBuffer", ArrayBuffer],
    ["SharedArrayBuffer", SharedArrayBuffer],
    ["Uint8ClampedArray", Uint8ClampedArray],
    ["Int8Array", Int8Array],
    ["Uint8Array", Uint8Array],
    ["Int16Array", Int16Array],
    ["Uint16Array", Uint16Array],
    ["Int32Array", Int32Array],
    ["Uint32Array", Uint32Array],
    ["Float32Array", Float32Array],
    ["Float64Array", Float64Array],
    ["DataView", DataView],
    ["Promise", Promise],
    ["console", console],
    ["print", print],
    // I added these myself
    ["TypeScript", TypeScript],
    ["toolsVersion", toolsVersion]
];

// Main function
// Using setTimeout to prevent RangeError: Maximum call stack size exceeded
// This custom setTimeout also works in Minecraft ingame because timers module doesn't exist
TestModules.forEach(Module => __setTimeout(() => {
    console.log(JSON.stringify(cloneJSON(GameTestFetch(Module[1])), FunctionToString));
    console.warn(`Successfully fetch module "${Module[0]}"`)
}, Math.random() * 100));