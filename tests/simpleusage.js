var parser = require('../index.js');


var argv = [
    'node',
    'index.js',
    '-a',
    '-b', 'test a',
    '--long-bool-param',
    '--long-value-param', 'param value',
    '--any-param', 'value any param',
    'extra value'
];

console.log("Test simple parse with next \"porocess.argv\" array values:");
console.log(argv);

parser.parse(argv, function(params, extraValues) {
    console.log(params);
    console.log(extraValues);
});