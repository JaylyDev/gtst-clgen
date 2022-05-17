const fs = require("fs")
const path = require("path")

function diff(obj1, obj2, version) {
    const result = { $added: [], $removed: [], $changed: {} };
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        // Key was added
        if (!obj1[key] && !!obj2[key]) {

            if (obj2 instanceof Array) {
                var jsonOut = diff({}, obj2[key], version)
                result.$added.push(jsonOut)
            } else if (typeof obj2[key] === "object") {
                var jsonOut = diff({}, obj2[key], version)
                result.$changed[key] = jsonOut
            }
            if (typeof key === "string" && isNaN(Number(key))) result.$added.push(key)
        }
        // Key was removed
        if (!!obj1[key] && !obj2[key]) {
            result.$removed.push(key)
        }
        // This check if the key is [] or {}, they have seperate processes
        if (obj1[key] instanceof Array && obj2[key] instanceof Array)
        {
            var arr1 = obj1[key], arr2 = obj2[key]
            const addedKeys = arr2.filter(x => !arr1.includes(x));
            const removedKeys = arr1.filter(x => !arr2.includes(x));

            var jsonOut = { $added: [], $removed: [] };
            for (var eKey of addedKeys) jsonOut.$added.push(eKey)
            for (var eKey of removedKeys) jsonOut.$removed.push(eKey)

            if (jsonOut.$added.length + jsonOut.$removed.length > 0) result.$changed[key] = jsonOut
        }
        else if (typeof obj1[key] == "object" && typeof obj2[key] == "object")
        {
            var jsonOut = diff(obj1[key], obj2[key], version)
            result.$changed[key] = jsonOut
        }
    });
    if (result.$added.length + result.$removed.length + Object.keys(result.$changed).length > 0) return result;
}

const modules = ["mojang-minecraft", "mojang-gametest", "mojang-minecraft-ui", "mojang-minecraft-server-admin"]
const changelog = {
    "mojang-minecraft": {},
    "mojang-gametest": {},
    "mojang-minecraft-ui": {},
    "mojang-minecraft-server-admin": {},
    "mojang-net": {}
}
const versions = {
    // add the version before module exist in the 1st slot
    "mojang-minecraft": [ '1.16.201.2', '1.16.210.5', '1.16.220.2', '1.17.0.2', '1.17.10.4', '1.17.30.4', '1.17.40.6', '1.18.0.2', '1.18.10.4', '1.18.30.4', '1.19.0.33-beta'],
    "mojang-gametest": [ '1.16.201.2', '1.16.210.5', '1.16.220.2', '1.17.0.2', '1.17.10.4', '1.17.30.4', '1.17.40.6', '1.18.0.2', '1.18.10.4', '1.18.30.4', '1.19.0.33-beta'],
    "mojang-minecraft-ui": [ '1.18.10.4', '1.18.30.4', '1.19.0.33-beta'],
    "mojang-minecraft-server-admin": ['1.18.30.4', '1.19.0.33-beta'],
    // MODULE PLACEHOLDER (DO NOT INCLUDE THEM IN MODULES ARRAY)
    "mojang-net": [],
    "unreleased minecraft client module placeholder": []
}

for (const module of modules) {
    const files = [{}]
    for (const filename of fs.readdirSync(path.join(`${__dirname}/../raw`))) if (filename.endsWith(`-${module}.json`)) {
        files.push(JSON.parse(fs.readFileSync(path.join(`${__dirname}/../raw/${filename}`)).toString()));
        console.log("Loaded", filename);
    }

    for (let index = 1; index < files.length; index++) {
        changelog[module][versions[module][index]] = diff(files[index - 1], files[index], [versions[module][index - 1], versions[module][index]])
    }

}

try {
    const prettier = require("prettier");
    fs.writeFileSync(path.join(`${__dirname}/../generated/changelog.json`), prettier.format(JSON.stringify(changelog), { parser: "json" }))
} catch {
    fs.writeFileSync(path.join(`${__dirname}/../generated/changelog.json`), JSON.stringify(changelog, null, 2))
}
