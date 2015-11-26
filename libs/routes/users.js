'use strict';

var Users = require('../schema').users;
var formatters = require('../../utils/formatters').users;

var defaultRestrictions = {limit: 10, offset: 0};

module.exports = {
    index: function(req, resp){
        var limit  = parseInt(req.param('limit'));
        var offset = parseInt(req.param('offset'));
        var filter = parseInt(req.param('offset')) || {};

        var restrictions = {
            limit : !isNaN(limit) ? limit : defaultRestrictions.limit,
            offset: !isNaN(offset) ? offset : defaultRestrictions.offset
        };

        Users.getAll(restrictions, filter).then(function (users) {
            resp.json(formatters.index(users));
        }, function(err){
            return err;
        }).done();
    },
    show: function(req, resp){
        var id = req.param('id');

        return Users.getOne(id).then(function (user) {
            return resp.json(formatters.show(user));
        }, function(err){
            return err;
        }).done();
    },
    update: function(){

    },
    delete: function(){

    }
};