"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var Generator = require("./JSONGeneratorWriter");
var modules = /** @class */ (function () {
    function modules() {
    }
    var _a, _b, _c;
    modules["mojang-minecraft"] = (_a = require("./mojang-minecraft.json")) !== null && _a !== void 0 ? _a : JSON.parse(fs.readFileSync(path.join("".concat(__dirname, "/mojang-minecraft.json"))).toString());
    modules["mojang-gametest"] = (_b = require("./mojang-gametest.json")) !== null && _b !== void 0 ? _b : JSON.parse(fs.readFileSync(path.join("".concat(__dirname, "/mojang-gametest.json"))).toString());
    modules["mojang-minecraft-ui"] = (_c = require("./mojang-minecraft-ui.json")) !== null && _c !== void 0 ? _c : JSON.parse(fs.readFileSync(path.join("".concat(__dirname, "/mojang-minecraft-ui.json"))).toString());
    return modules;
}());
var GenerateModules = ["mojang-minecraft", "mojang-gametest", "mojang-minecraft-ui"];
if (!fs.existsSync(path.join("".concat(__dirname, "/dist"))))
    fs.mkdirSync(path.join("".concat(__dirname, "/dist")));
Object.keys(GenerateModules).forEach(function (module) {
    fs.writeFile(path.join(__dirname) + "/dist/".concat(GenerateModules[module], ".json"), Generator["default"](modules[GenerateModules[module]]), function () { });
    console.log("[".concat(new Date().toISOString(), "] Generated ").concat(GenerateModules[module]));
});
