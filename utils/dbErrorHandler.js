'use strict';

var correspondTable = {
    11000: 'DUPLICATED'
};

var dbErrorHandler = function() {
    return this;
};

dbErrorHandler.prototype.getError = function(err) {
    var errorMeaning = correspondTable[err.code] || err.code;
    var field = (err.err.match(/\$(\w*)\_/) || []).pop();

    var error = {};
    error[field] = errorMeaning;

    return { error: error };
};

module.exports = dbErrorHandler;