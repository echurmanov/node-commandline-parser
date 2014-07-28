
module.exports = Result;


/**
 * Parse result object
 *
 * @param {[Option]} options
 * @param {Array} operands
 * @constructor
 */
function Result(options, operands) {
    this.operands = operands.slice(0);
    this.options = [];
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