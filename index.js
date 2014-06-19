/**
 * Created by eugene on 19.06.14.
 */

console.log(process.argv);

module.exports = {
    parse: parse,
    Section: Section
};


/**
 * Parse passed params
 * @param {Array} argv
 * @param {{Section}[]|{Object}|function} [params]
 * @param {function} [callback]
 */
function parse(argv, params, callback) {
    var args = argv.slice(0);


    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    setTimeout(function parseAsync(){
        if (typeof params === 'undefined' || params === null) {
            var unUsed = [];
            var result = {};
            for (var i = 0; i < args.length; i++) {
                if (args[i].length >=3 && args[i].substr(0, 2) === '--') {
                    var paramName = args[i].substr(2);
                    var paramValue = true;
                    if (i < args.length - 1 && args[i + 1].substr(0, 1) !== '-') {
                        paramValue =  args[i + 1];
                        i++;
                    }
                    result[paramName] = paramValue;
                } else if (args[i].length >= 2 && args[i].substr(0, 1) === '-') {
                    var paramName = args[i].substr(1, 1);
                    var paramValue = args[i].substr(2);
                    if (!paramValue) {
                        paramValue = true;
                        if (i < args.length - 1 && args[i + 1].substr(0, 1) !== '-') {
                            paramValue =  args[i + 1];
                            i++;
                        }
                    }
                    result[paramName] = paramValue;
                } else {
                    unUsed.push(args[i]);
                }
            }
            if (callback) {
                callback(null, result, unUsed)
            }
        } else if (typeof params === 'object' && params instanceof Array){

            if (params.length === 0) {
                callback(null, null, args);
            } else {
                if (params[0] instanceof Section) {

                } else {
                    var result = {};
                    var unUsed = [];
                    for (var argumentIndex = 0; argumentIndex < args.length; argumentIndex++ ) {
                        var paramName = '';
                        var paramValue = false;
                        if (args[argumentIndex].length >=3 && args[argumentIndex].substr(0, 2) === '--') {
                            paramName = args[argumentIndex].substr(2);
                        } else if (args[argumentIndex].length === 2 && args[argumentIndex].substr(0, 1) === '-') {
                            paramName = args[argumentIndex].substr(1);
                        }
                        if (paramName) {
                            for (var paramIndex = 0; paramIndex < params.length && paramValue === false; paramIndex++) {
                                if (params[paramIndex].name == paramName) {
                                    if (params[paramIndex].value) {
                                        if (paramName.length == 1) {
                                            paramValue = args[argumentIndex].substring(2);
                                        }
                                        if (!paramName && argumentIndex < args.length - 1) {
                                            paramValue = args[argumentIndex + 1];
                                            argumentIndex++;
                                        }
                                    }
                                }
                            }
                        }
                        if (paramValue) {
                            result[paramName] = paramValue;
                        } else {
                            unUsed.push(args[argumentIndex]);
                        }

                    }
                }
            }
            if (callback) {
                callback(null, result, unUsed)
            }
        }
    }, 0);
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
