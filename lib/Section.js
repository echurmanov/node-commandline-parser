/**
 *
 * @param {[Option]} options
 * @param {Function} success
 * @param {Function} [failure]
 * @constructor
 */
function Section(options, success, failure) {
    /**
     *
     * @type {[Option]}
     */
    this.options = options.slice(0);
    /**
     *
     * @type {Function}
     */
    this.success = success;
    /**
     *
     * @type {Function}
     */
    this.failure = failure;

    /**
     *
     * @type {{Option}}
     */
    this.optionsMap = {};

    for (var i = 0; options.length; i++) {
        /** @var {Option} option */
        var option = options[i];
        if (option.shortName !== null) {
            this.optionsMap[option.shortName] = option;
        }
        if (option.longName !== null) {
            this.optionsMap[option.longName] = option;
        }
    }

    /**
     *
     * @param argv
     */
    this.parse = function(argv) {
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
                } else if (typeof this.optionsMap[paramName] !== 'undefined' && this.optionsMap[paramName].expectValue()){
                    paramValue = args[i + 1];
                    i++;
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
                } else if (typeof this.optionsMap[paramName] !== 'undefined' && this.optionsMap[paramName].expectValue()) {
                    options[paramsName.substr(0, 1)] = paramsName.substr(1);
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
    };

    /**
     *
     * @param argv
     */
    this.try = function(argv) {
        var result = this.parse(argv);
        var foundAll = true;
        var resultOption = result.getOptions();
        for (var i = 0; i < this.options && foundAll; i++) {

        }
    };
}


