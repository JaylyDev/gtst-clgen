import * as fs from "fs";
import * as buffer from "buffer"
import setTimeout from "./timers.js";
import GameTestFetch, { Function2String } from "./GameTestFetch.js";

setTimeout(() => {
  console.log(JSON.stringify(GameTestFetch(Date), Function2String));
  console.warn("Date passed");
}, 1000);

setTimeout(() => {
  console.log(JSON.stringify(GameTestFetch(Math), Function2String));
  console.warn("Math passed");
}, 1000);

setTimeout(() => {
  console.log(JSON.stringify(GameTestFetch(Map), Function2String));
  console.warn("Map passed");
}, 1000);

setTimeout(() => {
  console.log(JSON.stringify(GameTestFetch(fs), Function2String));
  console.warn("fs passed");
}, 1000);

setTimeout(() => {
  console.log(JSON.stringify(GameTestFetch(globalThis), Function2String));
  console.warn("globalThis passed");
}, 1000);

setTimeout(() => {
  console.log(JSON.stringify(GameTestFetch(buffer), Function2String));
  console.warn("buffer passed");
}, 1000);
