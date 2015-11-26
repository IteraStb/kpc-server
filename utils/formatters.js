'use strict';

var _ = require('lodash');

var formats = {
    users : {
        index: {
            id         : 'id',
            avatar     : 'avatar',
            email      : 'email',
            first_name : 'first_name',
            last_name  : 'last_name',
            position   : 'position'
        },

        show : {
            id         : 'id',
            avatar     : 'avatar',
            email      : 'email',
            first_name : 'first_name',
            last_name  : 'last_name',
            position   : 'position',
            role       : 'roleId.value',
        }
    }
};

function getProp(longProp, data){
    var props = longProp.split('.');

    return props.reduce(function(res, prop){
        return res ? res[prop] : res; }, data);
}

function mapper(data){
    var format = this;

    function objMapper(dataObj){
        var formatedData = {};

        _.each(format, function(initialProp, newProp){
            formatedData[newProp] = getProp(initialProp, dataObj);
        });

        return formatedData;
    }

    return _.isArray(data) ? data.map(objMapper) : objMapper(data);
}

var formatters = {
    users : {
        index: mapper.bind(formats.users.index),
        show : mapper.bind(formats.users.show)
    }
};

module.exports = formatters;