
module.exports = Option;


/**
 * Option configuration
 *
 * @param {String} name
 * @param {bool} needValue
 * @constructor
 */
function Option() {
    this.shortName = null;
    this.longName = null;
    this.needValue = false;
    this.required = false;
    this.value = null;


    /**
     *
     * @returns {string}
     */
    this.getValue = function () {
        return this.value;
    };

    this.isRequired = function () {
        return this.required;
    };

    /**
     *
     * @returns {string}
     */
    this.getName = function () {
        return this.longName?this.longName:this.shortName;
    };

    /**
     *
     * @returns {String}
     */
    this.getShortName = function() {
        return this.shortName;
    };

    /**
     *
     * @returns {String}
     */
    this.getLongName = function() {
        return this.longName;
    };

    /**
     *
     * @returns {boolean}
     */
    this.expectValue = function () {
        return this.needValue;
    };

    /**
     *
     * @param value
     * @returns {Option}
     */
    this.setShortName = function(value) {
        this.shortName = value;
        return this;
    };

    /**
     *
     * @param value
     * @returns {Option}
     */
    this.setLongName = function(value) {
        this.longName = value;
        return this;
    };

    /**
     *
     * @param value
     * @returns {Option}
     */
    this.setNeedValue = function(value) {
        this.needValue = value;
        return this;
    };

    /**
     *
     * @param {bool} value
     * @returns {Option}
     */
    this.setRequired = function (value) {
        this.required = value;
        return this;
    };

    /**
     *
     * @param {string} value
     * @returns {Option}
     */
    this.setValue = function (value) {
        this.value = value;
        return this;
    };
}