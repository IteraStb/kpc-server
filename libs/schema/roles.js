'use strict';

var mongoose = require('mongoose');
var Q = require('q');

var Schema = mongoose.Schema;
var RoleSchema = new Schema({
    _id   : Number,
    title : String,
    value : String
});

var Role = mongoose.model('roles', RoleSchema);

module.exports = {
    get: function(){
        var defer = Q.defer();

        Role.find({}, function (err, roles) {
            if (!err) {
                defer.resolve(roles);
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    },

    add: function(role){
        var defer = Q.defer();

        var newRole = new Role(role);
        newRole.save(function(err, newRole){
            if (!err) {
                defer.resolve(newRole);
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    },

    clear: function(){
        var defer = Q.defer();

        Role.collection.remove( {}, function(err){
            if (!err) {
                defer.resolve();
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    }
};
