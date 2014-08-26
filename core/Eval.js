var Value = require('./Value.js'),
    T = Value.Types,
    Env = require('./Env.js'),
    GLOBAL = require('./globals.js');

var e = module.exports = function (exp, env) {
  env = env || GLOBAL;
  var r;
  if (Array.isArray(exp)) {
    for (var i in exp) {
      r = evals[T[exp[i].type]](exp[i], env);
    }
    return r;
  }
  return evals[T[exp.type]](exp, env);
};

function call(f, exp, env) {
  // Buildin?
  if (f.value.buildin) {
    return f.value.func(exp, env);
  }

  var given = exp.children.length;
  var total = f.value.formals.length;
  var formals = f.value.formals;
  var params = exp.children;

  if (given < total) {
    throw("Too few arguments given to function");
  }
  if (given > total) {
    throw("Too many arguments given to function");
  }

  var en = new Env(f.value.env);
  for (var i = 0; i < total; i++) {
    en.set(formals[i], params[i]);
  }

  return e(f.value.body, en);
}

var evals = {};
evals[T.NATURAL] = function (exp) {
  return Value.Natural(exp.value);
};
evals[T.ID] = function (exp, env) {
  try {
    return env.find(exp.value).get(exp.value);
  } catch(e) {
    throw("Undefined Symbol!");
  }
};
evals[T.LAMBDA] = function (exp) {
  return exp;
};
evals[T.SEXP] = function (sexp, env) {
  // Evaluate children
  for (var i = 0; i < sexp.children.length; i++) {
    sexp.children[i] = e(sexp.children[i], env);
  }
  // Error check
  for (i = 0; i < sexp.children.length; i++) {
    if (sexp.children[i].type === T.ERROR) {
      return sexp.children[i];
    }
  }

  // Empty?
  if (sexp.children.length === 0) { return sexp; }

  // Single Expression
  if (sexp.children.length === 1) { sexp.children[0] = e(sexp.children[0], env); }
  // Ensure we got a call
  var f = sexp.children.shift();
  if (f.type !== T.LAMBDA) {
    return Value.Error('S-expression starts with incorrect type!');
  }

  return call(f, sexp, env);
};
evals[T.DEFN] = function (exp, env) {
  var l = env.find("lambda").get("lambda").value.func(exp, env);
  env.set(exp.name, l);
  return l;
};
