'use strict';

var Q = require('q');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TopicSchema = new Schema({
    _id   : String,
    title : String,
    area  : String,
    description : String
});

var Topic = mongoose.model('topics', TopicSchema);

module.exports = {
    get: function(){
        var defer = Q.defer();

        Topic.find({}, function (err, topics) {
            if (!err) {
                defer.resolve(topics);
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    },

    add: function(topic){
        var defer = Q.defer();

        var newTopic = new Topic(topic);
        newTopic.save(function(err, newTopic){
            if (!err) {
                defer.resolve(newTopic);
            } else {
                console.log(err);
                defer.reject(err);
            }
        });

        return defer.promise;
    },

    clear: function(){
        var defer = Q.defer();

        Topic.collection.remove( {}, function(err){
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
