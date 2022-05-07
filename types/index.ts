import * as fs from "fs"
import * as path from "path"
import { docs_raw } from "./typings"

class modules {
  static "mojang-minecraft": docs_raw = require("./mojang-minecraft.json") ?? JSON.parse(fs.readFileSync(path.join(`${__dirname}/mojang-minecraft.json`)).toString())
  static "mojang-gametest": docs_raw = require("./mojang-gametest.json") ?? JSON.parse(fs.readFileSync(path.join(`${__dirname}/mojang-gametest.json`)).toString())
  static "mojang-minecraft-ui": docs_raw = require("./mojang-minecraft-ui.json") ?? JSON.parse(fs.readFileSync(path.join(`${__dirname}/mojang-minecraft-ui.json`)).toString())
}

let jsonout = {}

for (let ModuleClass of modules["mojang-minecraft"].classes) for (let properties of ModuleClass.properties) {
  jsonout[ModuleClass.name] = jsonout[ModuleClass.name] ?? {}
  jsonout[ModuleClass.name][properties.name] = properties.type.name
}

fs.writeFile(path.join(__dirname) + "/testing.json", JSON.stringify(jsonout, null, 4), () => {})