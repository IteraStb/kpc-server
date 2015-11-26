'use strict';

var Q = require('q');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kn_list_app');

var roles = require('../../data/test/roles.json');
var Roles = require('../../libs/schema/roles');

Roles.clear()
    .then(function(){
        console.log('Collection ROLES is dropped.');

        var rolesPromises = roles.map(function(role){
            return Roles.add(role).then(function(){
                console.log('Role '+role.title+' is added.')
            });
        });

        Q.allSettled(rolesPromises).then(function(){
            process.exit(1);
        });
});
