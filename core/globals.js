var Env = require('./Env.js'),
    buildins = require('./buildin.js');

var G = new Env();

function createBuildin(name, func) {
  G.set(name, {
    type: "LAMBDA",
    value: {
      func: func,
      buildin: true
    }
  });
}

createBuildin("lambda", buildins.lambda);
createBuildin("+", buildins.add);
createBuildin("env", buildins.printEnv);

module.exports = G;
