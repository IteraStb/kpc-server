'use strict';

var Q = require('q');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kn_list_app');

var users = require('../../data/test/users.json');
var Users = require('../../libs/schema/users');

Users.clear()
    .then(function(){
        console.log('Collection USERS is dropped.');

        var usersPromises = users.map(function(user){
            return Users.add(user).then(function(){
                console.log('User '+
                                user.last_name+' '+user.first_name+
                            ' is added.');
            });
        });

        Q.allSettled(usersPromises).then(function(){
            process.exit(1);
        });
});
