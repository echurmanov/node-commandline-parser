/**
 * Created by eugene on 19.06.14.
 */

console.log(process.argv);

module.exports = {
    parse: parse,
    Section: Section
};

/**
 * Parse result object
 *
 * @param {Object} options
 * @param {Array} operands
 * @constructor
 */
function Result(options, operands) {
    this.operands = operands.slice(0);
    this.options = {};
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            this.options[i] = options[i];
        }
    }

    /**
     * Get operands number
     * @returns number
     */
    this.getOperandsNumber = function() {
        return this.operands.length;
    };

    /**
     * Get operands list
     * @returns {Array}
     */
    this.getOperands = function() {
        return this.operands.slice(0);
    };

    /**
     * Return option value or undefined if option not exists
     *
     * @param {String} option
     * @returns {String}
     */
    this.getOption = function (option) {
        return this.options[option];
    };

    /**
     * Return all known options
     *
     * @returns {Object}
     */
    this.getOptions = function () {
        var option = {};
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.options[i] = options[i];
            }
        }
        return option;
    };

    /**
     * Return true if passed option exists and not equal FALSE
     *
     * @param {String} option
     * @returns {boolean}
     */
    this.hasOption = function (option) {
        return (this.options.hasOwnProperty(option) && this.options[option] !== false);
    };

}

/**
 * Param configuration
 *
 * @param {String} name
 * @param {bool} needValue
 * @constructor
 */
function Param(name, needValue) {
    this.name = name;
    this.value = needValue !== false;

    /**
     *
     * @returns {String}
     */
    this.getName = function() {
        return this.name;
    };

    /**
     *
     *
     * @returns {boolean}
     */
    this.expectValue = function () {
        return this.value;
    };
}

/**
 * Parse args with siple logic
 *
 * @param {Array} argv
 * @returns {Result}
 */
function simpleParse(argv) {
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
            if (i < args.length - 1 && args[i + 1].substr(0, 1) !== '-') {
                paramValue =  args[i + 1];
                i++;
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
