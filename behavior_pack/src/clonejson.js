/**
 * JSON clone function (Modified)
 * https://stackoverflow.com/a/17502990
 */
/**
 * Remove Circular object
 * @param {object} obj
 * @returns {boolean}
 */
function isCyclic(obj) {
  var keys = [];
  var stack = [];
  var stackSet = new Set();
  var detected = false;

  function detect(obj, key) {
    if (obj && typeof obj != 'object') { return; }

    if (stackSet.has(obj)) { // it's cyclic! Print the object and its locations.
      var oldindex = stack.indexOf(obj);
      var l1 = keys.join('.') + '.' + key;
      var l2 = keys.slice(0, oldindex + 1).join('.');
      console.warn('CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj);
      // console.warn(obj);
      detected = true;
      return;
    }

    keys.push(key);
    stack.push(obj);
    stackSet.add(obj);
    for (var k in obj) { //dive on the object's children
      if (Object.prototype.hasOwnProperty.call(obj, k)) { detect(obj[k], k); }
    }

    keys.pop();
    stack.pop();
    stackSet.delete(obj);
    return;
  }

  detect(obj, 'obj');
  return detected;
}
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
  for (var i in obj) {
    cloneO[i] = native(obj[i]);
  };
  return cloneO;
}

/**
 * 
 * @description code stays native so you cant see from interpreter in minecraft
 * @param {*} a
 * @returns JSON
 */
export const cloneJSON = (a) => { return native(a) }