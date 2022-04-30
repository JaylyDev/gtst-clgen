/**
 * This script is currenly in development,
 * it's subject to change so please don't send bug reports about it!
 * Please contribute i dont have the time working on this
 */
const fs = require("fs")
const path = require("path")
const jsonChangelog = require("../generated/changelog.json")

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
 * @returns {string}
 */
function writeDocs (added = [], removed = [], changed = {}, docs = "", paddling = generatePaddling(4), type) {
  // Preparing for processes
  const ignoredVariables = ["name", "length"]
  for (let ignoredVariable of ignoredVariables) {
    let index = added.indexOf(ignoredVariable)
    if (index > -1) added.splice(index, 1);
  }

  for (let variable of added) {
    var addPaddle = false
    if (!type) {
      docs += `${paddling}- Added \`${variable}\`\n`
    }
    else {
      docs += `${paddling}- Added ${type} \`${variable}\`\n`;
      addPaddle = true
    }
    if (typeof changed === "object") {
      const element = changed[variable] ?? { $added: [], $removed: [], $changed: {} }
      docs = writeDocs(element.$added, element.$removed, element.$changed, docs, generatePaddling(paddling.length + 4), (addPaddle === true ? "property" : "element"))
    }
  }

  for (let variable of removed) {
    if (!type) {docs += `${paddling}- Removed \`${variable}\`\n`}
    else docs += `${paddling}- Removed ${type} \`${variable}\`\n`
  }

  for (let variable in changed) {
    if (!added.includes(variable)) {
      if (!type) {
        docs += `${paddling}- Changed \`${variable}\`\n`
        docs = writeDocs(changed[variable].$added, changed[variable].$removed, changed[variable].$changed, docs, generatePaddling(paddling.length + 4), "element")
      }
      else {
        docs += `${paddling}- Changed ${type} \`${variable}\`\n`
        docs = writeDocs(changed[variable].$added, changed[variable].$removed, changed[variable].$changed, docs, generatePaddling(paddling.length + 4), "property")
      }
    }
  }

  return docs
}

for (var moduleName in jsonChangelog) {
  const module = jsonChangelog[moduleName]
  let changelogText = `\`${moduleName}\``
  changelogText += `\n\n== Change Log ==`

  for (var version of Object.keys(module).reverse()) {
    // Define components that are added, removed and changed
    // Using try catch because some variables do not have some elements
    var addedComponents = [], removedComponents = [], changedComponents = {}
    try { addedComponents = module[version].$added } catch {};
    try { removedComponents = module[version].$removed } catch {};
    try { changedComponents = module[version].$changed } catch {};
    if (addedComponents.length + removedComponents.length + Object.keys(changedComponents).length > 0) changelogText += `\n=== v${version} ===\n`
  
    changelogText = writeDocs(addedComponents, removedComponents, changedComponents, changelogText, "")
  }
  changelogText += `\n== /Change Log ==`
  fs.writeFileSync(path.join(`${__dirname}/../generated/${moduleName}.txt`), changelogText)
}