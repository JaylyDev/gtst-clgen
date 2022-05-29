import { cloneJSON } from "./clonejson.js";

const ignored: (string | symbol)[] = ['caller', 'callee', 'arguments'];

export function GameTestFetch(obj: object, origin?: object): object {
    if (obj === origin) return {};
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
        else if (typeof obj[member] === "object") {
            Response[member] = GameTestFetch(obj[member], obj);

            if (["[]", "{}"].includes(JSON.stringify(Response[member]))) {
                Response[member] = cloneJSON(obj[member]);
            }
        }
        else Response[member] = obj[member];
    }

    return Response;
}

export function FunctionToString (key: string, value: any): any {
    if (typeof value === "function") value = String(value);
    return value;
};