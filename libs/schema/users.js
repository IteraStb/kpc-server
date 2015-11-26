'use strict';

var Q = require('q');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name : String,
    last_name  : String,
    email      : String,
    avatar     : String,
    position   : String,
    roleId     : {type: Number, ref: 'roles' },
    _knListId  : Schema.Types.ObjectId,
    salt       : String,
    hashedPassword : String
});

UserSchema.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

UserSchema.virtual('password')
    .set(function(password) {
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this.hashedPassword; });

UserSchema.methods.authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
};

UserSchema.methods.makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};

UserSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

var User = mongoose.model('users', UserSchema);

module.exports = {
    getAll: function(restrictions, filter){
        var defer  = Q.defer();
        var limit  = restrictions.limit;
        var offset = restrictions.offset;

        User
            .find(filter)
            .sort({'_id': -1})
            .skip(offset)
            .limit(limit)
            .populate('roleId')
            .exec(function (err, users) {
                if (!err) {
                    defer.resolve(users);
                } else {
                    console.log(err);
                    defer.reject(err);
                }
            });

        return defer.promise;
    },

    getOne: function(id){
        var defer = Q.defer();

        User
            .findOne({_id: id})
            .populate('roleId')
            .exec(function (err, user) {
                if (!err && user) {
                    defer.resolve(user);
                } else {
                    console.log(err);
                    defer.reject(err);
                }
            });

        return defer.promise;
    },

    add: function(userData){
        var defer = Q.defer();

        var newUser = new User(userData);
        newUser.save(function(err, newUser){
            if (!err) {
                defer.resolve(newUser);
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    },

    clear: function(){
        var defer = Q.defer();

        User.collection.remove( {}, function(err){
            if (!err) {
                defer.resolve();
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    },

    authenticate: function(credentials){
        var defer = Q.defer();

        if (!credentials.email || !credentials.password){
            defer.reject({error: {email: 'REQUIRED', password: 'REQUIRED'}});

        } else {
            User.findOne({email: credentials.email}, function(err, user){

                if (!err && user && user.authenticate(credentials.password)){
                    defer.resolve({success: 1, userId: user.id});
                } else {
                    defer.reject({error: {login: 'WRONG', password: 'WRONG'}});
                }
            });
        }

        return defer.promise;
    }
};
