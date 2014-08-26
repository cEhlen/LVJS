var Value = require('./Value.js'),
    T = Value.Types;

module.exports.lambda = function (a, env) {
  return Value.Lambda(a.name, a.params, a.body, env);
};

module.exports.add = function (a, env) {
  var rslt = 0;
  for (var i = 0; i < a.children.length; i++) {
    var c = a.children[i];
    if (c.type !== T.NATURAL) {
      throw('Type Error. Expected Natural but got ' + c.type);
    }
    rslt += c.value;
  }
  return Value.Natural(rslt);
};

module.exports.printEnv = function (a, env) {
  return env;
};
