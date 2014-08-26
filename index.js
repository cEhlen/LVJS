var parser = require('./lib/parser'),
    Eval = require('./core/Eval.js'),
    Printer = require('./lib/printer.js'),
    fs = require('fs'),
    readline = require('readline'),
    util = require('util');

console.log("LVJS Version 0.0.1");
console.log("Press Ctrl+C to exit\n");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('LVJS> ');
rl.prompt();

rl.on('line', function(line){
    var tree = parser.parse(line);
    for (var n in tree) {
      console.log(util.inspect(Printer(Eval(tree[n])), {colors: true, depth: null}));
    }
    rl.prompt();
});
