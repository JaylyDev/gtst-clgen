import * as clonejson from "./clonejson.js";

function GameTestFetch(obj: object): object {
  if (typeof obj !== "function" && !(obj instanceof Object)) return obj;

  const NewObject = {};

  for (const key of Reflect.ownKeys(obj)) {
    if (key === "prototype") {
      NewObject[key] = Reflect.ownKeys(obj[key])
    } else if (typeof obj[key] === "object" && obj[key] !== obj) {
      NewObject[key] = clonejson.default(obj[key])
    } else if (typeof obj[key] === "function") {
      NewObject[key] = (function* (obj) { return GameTestFetch(obj); })(obj[key])
    }
    else NewObject[key] = obj[key];
  };

  return NewObject
}

const seen = new WeakSet();
export const Function2String = (key: string, value: any) => {
  if (typeof value === "function") value = String(value);

  if (typeof value === "object" && value !== null) {
    if (seen.has(value)) {
      return;
    }
    seen.add(value);
  }
  return value;
}

export default GameTestFetch