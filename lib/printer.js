var Value = require('../core/Value.js'),
    T = Value.Types;

module.exports = function (v) {
  try {
    if (v.type === T.NATURAL) {
      return v.value;
    }
    if (v.type === T.LAMBDA) {
      return "Function: " + v.value.name + "#" + v.value.formals.length;
    }
  } catch (e) {
  }
  return v;
};
