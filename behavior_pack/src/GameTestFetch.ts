import { cloneJSON } from "./clonejson.js";

const ignored: (string | symbol)[] = ['caller', 'callee', 'arguments'];

export function GameTestFetch(obj: object): object {
    if (typeof obj !== "object" && typeof obj !== "function" || obj === null) return obj;

    let Response = {};

    for (const member of Reflect.ownKeys(obj)) {
        if (typeof obj[member] === "function") {
            Response[member] = {};
            
            for (const classKey of Reflect.ownKeys(obj[member])) 
            if (ignored.includes(classKey)) {}
            else if (classKey === "prototype") {
                Response[member][classKey] = Reflect.ownKeys(obj[member][classKey]);
            } else if (typeof obj[member][classKey] === "object") {
                Response[member][classKey] = cloneJSON(obj[member][classKey]);
            } else {
                Response[member][classKey] = obj[member][classKey];
            }
        }
        else if (typeof obj[member] === "object") Response[member] = cloneJSON(obj[member]);
        else Response[member] = obj[member];
    }

    return Response;
}

export function FunctionToString (key: string, value: any): any {
    if (typeof value === "function") value = String(value);
    return noCirculars(value);
}

const noCirculars = (v: any) => {
    const set = new Set; 
    const noCirculars = (v: any) => {
      if(Array.isArray(noCirculars))
        return v.map(noCirculars);
      if(typeof v === "object" && v !== null) {
        if(set.has(v)) return undefined;
        set.add(v);
  
        return Object.fromEntries(Object.entries(v)
         .map(([k, v]) => ([k, noCirculars(v)])));
      }
      return v;
    };
    return noCirculars(v);
};
  