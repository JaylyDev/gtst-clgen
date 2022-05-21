/**
 * JSON clone function (Modified)
 * https://stackoverflow.com/a/17502990
 */
/**
 * Remove Circular object
 * @param {object} v 
 * @returns {object}
 */
const noCirculars = v => {
  const set = new Set; 
  const noCirculars = v => {
    if(Array.isArray(noCirculars))
      return v.map(noCirculars);
    if(typeof v === "object" && v !== null) {
      if(set.has(v)) return {};
      set.add(v);

      return Object.fromEntries(Object.entries(v)
       .map(([k, v]) => ([k, noCirculars(v)])));
    }
    return v;
  };
  return noCirculars(v);
};
/**
 * 
 * @param {object}
 * @returns {object}
 */

function native(obj) {
  if (typeof obj === "function") {
    return String(obj)
  }
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return obj;
  }
  if (obj instanceof Array) {
    var cloneA = [];
    for (var i = 0; i < obj.length; ++i) {
      cloneA[i] = native(obj[i]);
    }
    return cloneA;
  }
  var cloneO = {};
  obj = noCirculars(obj);
  for (var i in obj) {
    cloneO[i] = native(obj[i]);
  };
  return cloneO;
}

/**
 * 
 * @description code stays native so you cant see from interpreter in minecraft
 * @param {*} obj 
 * @returns JSON
 */
export const cloneJSON = (obj) => { return native(obj) }