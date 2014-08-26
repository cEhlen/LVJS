var Env = require('./Env.js');

function Value (type, data, children) {
  this.type = type || -1;
  this.value = data || null;
  this.children = children || null;
  return this;
}

module.exports = {
  "Error": function (err) { return Value(T.ERROR, err); },
  "Sexp": function () { return Value(T.SEXP); },
  "Id": function (sym) {
    if(typeof sym !== "string") {
      throw("Symbol must be a string! Sym: " + sym);
    }
    return new Value(T.ID, sym);
  },
  "Natural": function (x) {
    if(typeof x !== "number") {
      throw("Number must be a number! x: " + x);
    }
    return new Value(T.NATURAL, x);
  },
  "Lambda": function (name, formals, body, env) {
    return new Value(T.LAMBDA, {
      name: name,
      formals: formals,
      body: body,
      env: new Env(env),
      buildin: false
    });
  }
};

var T = module.exports.Types = {
  "ERROR": "ERROR",
  "SEXP": "SEXP",
  "ID": "ID",
  "NATURAL": "NATURAL",
  "LAMBDA": "LAMBDA",
  "DEFN" : "DEFN"
};
