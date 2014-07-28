/**
 * Created by eugene on 19.06.14.
 */

var Result = require('./lib/Result.js');
var Option = require('./lib/Option.js');

console.log(process.argv);

module.exports = {
    parse: parse,
    Section: Section
};

/**
 * Parse args with simple logic
 *
 * @param {Array} argv
 * @returns {Result}
 */
function simpleParse(argv, combineShort) {
    if (typeof combineShort === 'undefined') {
        combineShort = true;
    }
    var args = argv.slice(0);
    var operands = [];
    var options = {};
    for (var i = 0; i < args.length; i++) {
        if (args[i] === '--') {
            operands = args.slice(i + 1);
            i = args.length;
        } else if (args[i].length >=3 && args[i].substr(0, 2) === '--') {
            var paramName = args[i].substr(2);
            var paramValue = true;
            if (paramName.indexOf('=') !== -1) {
                paramValue = paramName.substr(paramName.indexOf('=') + 1);
                paramName = paramName.substr(0, paramName.indexOf('='));
            } else {
                if (i < args.length - 1 && args[i + 1].substr(0, 1) !== '-') {
                    paramValue = args[i + 1];
                    i++;
                }
            }
            options[paramName] = paramValue;
        } else if (args[i].length >= 2 && args[i].substr(0, 1) === '-') {
            var paramsName = args[i].substr(1);
            if (paramsName.length == 1) {
                paramValue = true;
                if (i < args.length - 1 && args[i + 1].substr(0, 1) !== '-') {
                    paramValue =  args[i + 1];
                    i++;
                }
                options[paramsName] = paramValue;
            } else if (combineShort) {
                for (var p = 0; p < paramsName.length; p++) {
                    options[paramsName.substr(p, 1)] = true;
                }
            } else {
                options[paramsName.substr(0, 1)] = paramsName.substr(1);
            }
        } else {
            operands = args.slice(i);
            i = args.length;
        }
    }

    return new Result(options, operands);
}

/**
 * Parse passed params
 * @param {Array} argv
 * @param {{Section}[]|{Object}|function} [params]
 * @param {function} [callback]
 */
function parse(argv, params, callback) {
    var args = argv.slice(2);


    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    process.nextTick(function parseAsync(){
        var result = new Result({}, []);
        if (typeof params === 'undefined' || params === null) {
            result = simpleParse(args);
            if (callback) {
                callback(null, result)
            }
        } else if (typeof params === 'object' && params instanceof Array && params.length > 0){

            if (params[0] instanceof Section) {

            } else {
                var options = {};
                var operands = [];
                for (var optionIndex = 0; optionIndex < params.length; optionIndex++) {
                    options[params[optionIndex].getName()] = false;
                }
                for (var i = 0; i < args.length; i++) {
                    if (args[i] === '--') {
                        operands = args.slice(i + 1);
                        i = args.length;
                    } else if (args[i].length >=3 && args[i].substr(0, 2) === '--') {
                        var paramName = args[i].substr(2);
                        var paramValue = true;
                        if (paramName.indexOf('=') !== -1) {
                            paramValue = paramName.substr(paramName.indexOf('=') + 1);
                            paramName = paramName.substr(0, paramName.indexOf('='));
                        }
                        
                        options[paramName] = paramValue;
                    } else if (args[i].length >= 2 && args[i].substr(0, 1) === '-') {
                        var paramsName = args[i].substr(1);
                        if (paramsName.length == 1) {
                            paramValue = true;
                            if (i < args.length - 1 && args[i + 1].substr(0, 1) !== '-') {
                                paramValue =  args[i + 1];
                                i++;
                            }
                            options[paramsName] = paramValue;
                        } else {
                            for (var p = 0; p < paramsName.length; p++) {
                                options[paramsName.substr(p, 1)] = true;
                            }
                        }
                    } else {
                        operands = args.slice(i);
                        i = args.length;
                    }
                }
            }
            if (callback) {
                callback(null, result);
            }
        }
    });
}


/**
 * Parse passed
 * @param {Array} argv
 * @param {{Section}[]|{Object}} [params]
 */
function parseSync(argv, params) {

}


function Section() {

}
