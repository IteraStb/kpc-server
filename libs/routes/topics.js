'use strict';

var Topics = require('../schema').topics;

module.exports = {
    index: function(req, resp){
        return Topics.get().then(function (topics) {
            return resp.json(topics);
        }).done();
    },
    show: function(){

    },
    update: function(){

    },
    delete: function(){

    }
};
