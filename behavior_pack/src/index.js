import * as mc from "mojang-minecraft";
import * as gt from "mojang-gametest";
import * as mcui from "mojang-minecraft-ui";
import * as mcsa from "mojang-minecraft-server-admin";

import { cloneJSON } from "./clonejson.js";
import { GameTestFetch, FunctionToString } from "./GameTestFetch.js";

console.log(JSON.stringify(cloneJSON(GameTestFetch(mc)), FunctionToString));
console.warn(`[${new Date().toISOString()}] Successfully fetch module "mojang-minecraft"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(gt)), FunctionToString));
console.warn(`[${new Date().toISOString()}] Successfully fetch module "mojang-gametest"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(mcui)), FunctionToString));
console.warn(`[${new Date().toISOString()}] Successfully fetch module "mojang-minecraft-ui"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(mcsa)), FunctionToString));
console.warn(`[${new Date().toISOString()}] Successfully fetch module "mojang-minecraft-server-admin"`);

console.log(JSON.stringify(cloneJSON(GameTestFetch(globalThis)), FunctionToString));
console.warn(`[${new Date().toISOString()}] Successfully fetch module "globalThis"`);
