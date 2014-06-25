var parser = require('../index.js');


var argv = [
    'node',
    'index.js',
    '-abc',
    '-d', 'test a',
    '--long-bool-param',
    '--long-value-param', 'param value',
    '--any-param', 'value any param',
    '--',
    '-a',
    '--test',
    'extra value'
];

console.log("Test simple parse with next \"porocess.argv\" array values:");
console.log(argv);

parser.parse(argv, function(err, options, operands) {
    console.log(options);
    console.log(operands);
});