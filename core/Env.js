function Env(parent) {
  this._data = {};
  this._parent = parent || null;
}

Env.prototype.set = function (sym, v) {
  this._data[sym] = v;
};

Env.prototype.find = function (v) {
  if (this._data[v] !== undefined) {
    return this;
  } else {
    return this._parent.find(v);
  }
};

Env.prototype.get = function (sym) {
  return this._data[sym];
};

module.exports = Env;
