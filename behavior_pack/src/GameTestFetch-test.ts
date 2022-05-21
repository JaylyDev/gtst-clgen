import * as fs from "fs";
import * as path from "path";
import * as buffer from "buffer";
import * as typescript from "typescript";

import { cloneJSON } from "./clonejson.js";
import { GameTestFetch, FunctionToString } from "./GameTestFetch.js";

console.log(JSON.stringify(cloneJSON(GameTestFetch(Date)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "Date"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(Math)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "Math"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(JSON)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "JSON"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(fs)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "fs"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(buffer)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "buffer"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(path)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "path"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(globalThis)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "globalThis"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(global)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "global"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(typescript)), FunctionToString));
console.warn(`[${new Date()}] Successfully fetch module "typescript"`);