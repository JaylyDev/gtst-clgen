import * as fs from "fs";
import * as path from "path";
import { docs_raw } from "./typings";
import * as Generator from "./JSONGeneratorWriter";

class modules {
  static "mojang-minecraft": docs_raw = require("./mojang-minecraft.json") ?? JSON.parse(fs.readFileSync(path.join(`${__dirname}/mojang-minecraft.json`)).toString())
  static "mojang-gametest": docs_raw = require("./mojang-gametest.json") ?? JSON.parse(fs.readFileSync(path.join(`${__dirname}/mojang-gametest.json`)).toString())
  static "mojang-minecraft-ui": docs_raw = require("./mojang-minecraft-ui.json") ?? JSON.parse(fs.readFileSync(path.join(`${__dirname}/mojang-minecraft-ui.json`)).toString())
}

const GenerateModules = ["mojang-minecraft", "mojang-gametest", "mojang-minecraft-ui"];

if (!fs.existsSync(path.join(`${__dirname}/dist`))) fs.mkdirSync(path.join(`${__dirname}/dist`))

Object.keys(GenerateModules).forEach(function (module) {
  fs.writeFile(
    path.join(__dirname) + `/dist/${GenerateModules[module]}.json`,
    Generator.default(modules[GenerateModules[module]]), () => {}
  );
  console.log(`[${new Date().toISOString()}] Generated ${GenerateModules[module]}`);
})