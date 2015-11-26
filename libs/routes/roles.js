'use strict';

var Roles = require('../schema').roles;

module.exports = {
    index: function(req, resp){
        return Roles.get().then(function (roles) {
            return resp.json(roles);
        }).done();
    },
    show: function(){

    },
    update: function(){

    },
    delete: function(){

    }
};
