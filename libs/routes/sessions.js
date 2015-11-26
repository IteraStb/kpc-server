'use strict';

var Sessions = require('../schema').sessions;

module.exports = {
    create: function(req, resp){
        var credentials = {
            email: req.param('email'),
            password: req.param('password')
        };

        return Sessions.create(credentials)
            .then( function(session){
                req.session.sid = session._id;
                return resp.json({success: 1, userId: session.userId});
            }, function(err){
                return resp.json(err);
            }).done();
    },

    isExist: function(req, resp, next){
        if(req.session.sid){
            next();
        } else {
            resp.json({error: 'AUTHENTICATION_ERROR'});
        }

    },

    delete: function(req, resp){
        return Sessions.delete(req.session.sid)
            .then(function(){
                req.session.sid = null;
                return resp.json({success: 1});
            }, function(err){
                return resp.json(err);
            }).done();
    }
};
