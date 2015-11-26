'use strict';

var Q = require('q');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kn_list_app');

var topics = require('../../data/test/topics.json');
var Topic = require('../../libs/schema/topics');

Topic.clear()
    .then(function(){
        console.log('Collection TOPICS is dropped.');

        var topicsPromises = topics.map(function(topic){
            return Topic.add(topic).then(function(){
                console.log('Topic '+topic.title+' is added.')
            });
        });

        Q.allSettled(topicsPromises).then(function(){
            process.exit(1);
        });
});
