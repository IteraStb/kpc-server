'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var KnListSchema = new Schema({
    first_name : String,
    last_name  : String,
    email      : String,
    avatar     : String
});

var User = mongoose.model('users', KnListSchema);

module.exports = {
    get: function(params, cb){

        User.find(params, function (err, users) {

            if (!err){
                if (cb){
                    cb(users);
                }
            } else {
                console.error(err);
            }
        });
    },

    add: function(props){

        var newUser = new User(props);
        newUser.save(function(err, newUser){
            if (!err){
                if (cb){
                    cb(newUser);
                }
            } else {
                console.error(err);
            }
        });
    }
};
