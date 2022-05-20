import * as mc from "mojang-minecraft";
import * as gt from "mojang-gametest";
import * as mcui from "mojang-minecraft-ui";
import * as mcsa from "mojang-minecraft-server-admin";

import setTimeout from "./timers.js";
import GameTestFetch, { Function2String } from "./GameTestFetch.js";

setTimeout(() => {
    console.log(JSON.stringify(GameTestFetch(globalThis), Function2String));
    console.warn("globalThis passed");
}, 1000);

setTimeout(() => {
    console.log(JSON.stringify(GameTestFetch(mc), Function2String));
    console.warn("mojang-minecraft passed");
}, 1000);

setTimeout(() => {
    console.log(JSON.stringify(GameTestFetch(gt), Function2String));
    console.warn("mojang-gametest passed");
}, 1000);

setTimeout(() => {
    console.log(JSON.stringify(GameTestFetch(mcui), Function2String));
    console.warn("mojang-minecraft-ui passed");
}, 1000);

setTimeout(() => {
    console.log(JSON.stringify(GameTestFetch(mcsa), Function2String));
    console.warn("mojang-minecraft-server-admin passed");
}, 1000);