/**
 * JSON clone function (Modified)
 * https://stackoverflow.com/a/17502990
 */
/**
 *
 * @param {object}
 * @returns {object}
 */
async function native(obj) {
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
  for (var i in obj) {
    cloneO[i] = obj[i];
  }
  return cloneO;
}
/**
 *
 * @description code stays native so you cant see from interpreter in minecraft
 * @param {*} obj
 * @returns {object}
 */
export default function (obj) {
  return native(obj)
};
export async function cloneJSONAsync (obj) {
  return await native(obj)
}