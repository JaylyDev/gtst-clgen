/**
 * This script is currenly in development,
 * it's subject to change so please don't send bug reports about it!
 * Please contribute i dont have the time working on this
 */
console.warn("This script is currenly in development and is being experimented...");
const fs = require("fs")
const path = require("path")
const jsonChangelog = require("../generated/changelog.json")
const gametestTypes = require("../types/dist/mojang-gametest.json")
const coreTypes = require("../types/dist/mojang-minecraft.json")
const uiTypes = require("../types/dist/mojang-minecraft-ui.json")

/**
 * 
 * @param {number} size 
 * @param {"space" | "tab"} option
 * @returns {string} Paddling
 */
function generatePaddling (size, option) {
  var generated = "";

  for (let index = 0; index < size; index++) {
    generated += option === "tab" ? "\u0009" : "\u0020"
  }
  return generated
}

/**
 * 
 * @param {string[]} added 
 * @param {string[]} removed 
 * @param {object} changed 
 * @param {string} paddling
 * @param {"element" | "property"} type
 * @param {string} docs
 * @param {boolean} newVariable
 * @param {object} reference ignore object variables
 * @returns {string}
 */
function writeDocs (added = [], removed = [], changed = {}, docs = "", paddling = generatePaddling(4), type, reference) {
  // Preparing for processes
  const ignoredVariables = ["name", "length"]
  for (let ignoredVariable of ignoredVariables) {
    let index = added.indexOf(ignoredVariable)
    if (index > -1) added.splice(index, 1);
  }
  /**
   * @type string
   */
  var variableType = null;

  for (let variable of added) {
    if (typeof reference !== "undefined") if (!!reference) {
      if (typeof reference === "object") {
        variableType = "class";
      } else if (!!reference) {
        variableType = reference
      }
    }
    var addPaddle = false
    if (!type) {
      docs += `${paddling}- Added ${variableType ?? ""} \`${variable}\`\n`
    }
    else {
      docs += `${paddling}- Added ${variableType ?? type} \`${variable}\`\n`;
      addPaddle = true
    }
    if (typeof changed === "object") {
      const element = changed[variable] ?? { $added: [], $removed: [], $changed: {} }
      docs = writeDocs(element.$added, element.$removed, element.$changed, docs, generatePaddling(paddling.length + 4), (addPaddle === true ? "property" : "element"), reference)
    }
  }
  
  for (let variable of removed) {
    if (!type) {docs += `${paddling}- Removed ${variableType ?? ""} \`${variable}\`\n`}
    else docs += `${paddling}- Removed ${variableType ?? type} \`${variable}\`\n`
  }

  for (let variable in changed) {
    if (!added.includes(variable)) {
      if (!type) {
        docs += `${paddling}- Changed ${variableType ?? ""} \`${variable}\`\n`
        docs = writeDocs(changed[variable].$added, changed[variable].$removed, changed[variable].$changed, docs, generatePaddling(paddling.length + 4), "element", reference)
      }
      else {
        docs += `${paddling}- Changed ${variableType ?? type} \`${variable}\`\n`
        docs = writeDocs(changed[variable].$added, changed[variable].$removed, changed[variable].$changed, docs, generatePaddling(paddling.length + 4), "property", reference)
      }
    }
  }

  return docs
}

for (var moduleName in jsonChangelog) {
  const module = jsonChangelog[moduleName]
  let changelogText = `\`${moduleName}\``
  changelogText += `\n\n== Change Log ==`

  let ModuleTypes = WhichMinecraftModule(moduleName);

  for (var version of Object.keys(module).reverse()) {
    // Define components that are added, removed and changed
    // Using try catch because some variables do not have some elements
    var addedComponents = [], removedComponents = [], changedComponents = {}
    try { addedComponents = module[version].$added } catch {};
    try { removedComponents = module[version].$removed } catch {};
    try { changedComponents = module[version].$changed } catch {};
    if (addedComponents.length + removedComponents.length + Object.keys(changedComponents).length > 0) changelogText += `\n=== v${version} ===\n`
  
    changelogText = writeDocs(addedComponents, removedComponents, changedComponents, changelogText, "", undefined, ModuleTypes)
  }
  changelogText += `\n== /Change Log ==`
  fs.writeFileSync(path.join(`${__dirname}/../generated/DEBUG.${moduleName}.txt`), changelogText);
  console.log("Write file:", path.join(`${__dirname}/../generated/DEBUG.${moduleName}.txt`))
}

/**
 * cant figure out what the name of the function should be
 * @param {"mojang-minecraft" | "mojang-gametest" | "mojang-minecraft-ui"} ModuleName 
 * @returns {object}
 */
function WhichMinecraftModule (ModuleName) {
  let module;

  if (ModuleName === "mojang-minecraft") module = coreTypes;
  else if (ModuleName === "mojang-gametest") module = gametestTypes;
  else if (ModuleName === "mojang-minecraft-ui") module = uiTypes;
  else module = {};

  return module;
}