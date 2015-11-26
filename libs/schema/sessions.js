'use strict';

var Q = require('q');
var Users = require('./users');
var ErrHandler = require('../../utils/dbErrorHandler');

var errHandler = new ErrHandler();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    startDate : Date,
    userId: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
                unique: true
            }
});

var Session = mongoose.model('sessions', SessionSchema);

module.exports = {
    create: function(credentials){
        var email    = credentials.email;
        var password = credentials.password;
        var defer    = Q.defer();

        Users.authenticate({email: email, password: password})
            .then(function(response){
                var userId = response.userId;
                var newSession = new Session({userId: userId, startDate: new Date()});

                newSession.save(function(err, newSession){
                    if (!err) {
                        defer.resolve(newSession);
                    } else {
                        defer.reject(errHandler.getError(err));
                    }
                });

            }, function(err){
                defer.reject(err);
            });

        return defer.promise;
    },

    getOne: function(userId){
        var defer = Q.defer();

        Session.findOne({userId: userId}).then(function(){
            defer.resolve({success: 1});
        });

        return defer.promise;
    },

    delete: function(sid){
        var defer = Q.defer();

        Session.findOne({_id: sid}).remove(function(err){
            if (!err){
                defer.resolve({success: 1});
            } else {
                defer.reject(err);
            }
        });

        return defer.promise;
    }
};
