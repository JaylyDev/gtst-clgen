import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

function diff(obj1: object, obj2: object, version: string[], self: object): any {
    const result: object = self ?? {};
    
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    };
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        // Key was added
        if (!obj1[key] && !!obj2[key]) {
            result[key] = {
                added: version[1],
                removed: null
            };
        };
        // Key was removed
        if (!!obj1[key] && !obj2[key]) {
            result[key] = {
                added: !!result[key] ? result[key].added : null,
                removed: version[1]
            };
        };
        if (!!obj1[key] && !!obj2[key]) {
            result[key] = result[key]
        };
    });
    return result;
}

const modules: string[] = ["mojang-minecraft", "mojang-gametest", "mojang-minecraft-ui", "mojang-minecraft-server-admin", "mojang-net"]
const changelog: object = {
    "mojang-minecraft": {},
    "mojang-gametest": {},
    "mojang-minecraft-ui": {},
    "mojang-minecraft-server-admin": {},
    "mojang-net": {}
}
const versions: object = {
    // add the version before module exist in the 1st slot
    "mojang-minecraft": [ '1.16.201.2', '1.16.210.5', '1.16.220.2', '1.17.0.2', '1.17.10.4', '1.17.30.4', '1.17.40.6', '1.18.0.2', '1.18.10.4', '1.18.30.4', '1.19.0.35-beta', '1.19.10.20-beta'],
    "mojang-gametest": [ '1.16.201.2', '1.16.210.5', '1.16.220.2', '1.17.0.2', '1.17.10.4', '1.17.30.4', '1.17.40.6', '1.18.0.2', '1.18.10.4', '1.18.30.4', '1.19.0.35-beta', '1.19.10.20-beta'],
    "mojang-minecraft-ui": [ '1.18.10.4', '1.18.30.4', '1.19.0.35-beta', '1.19.10.20-beta'],
    "mojang-minecraft-server-admin": ['1.18.30.4', '1.19.0.35-beta', '1.19.10.20-beta'],
    "mojang-net": ['1.19.0.35-beta', '1.19.10.20-beta']
}

for (const module of modules) {
    const files = [{}]
    for (const filename of fs.readdirSync(path.join(`${__dirname}/../raw`))) if (filename.endsWith(`-${module}.json`)) {
        files.push(JSON.parse(fs.readFileSync(path.join(`${__dirname}/../raw/${filename}`)).toString()));
        console.log("Loaded", filename);
    }

    for (let index = 1; index < files.length; index++) {
        changelog[module] = diff(files[index - 1], files[index], [versions[module][index - 1], versions[module][index]], changelog[module] ?? {})
    }

}

fs.writeFileSync(path.join(`${__dirname}/../generated/version.json`), prettier.format(JSON.stringify(changelog), { parser: "json" }))