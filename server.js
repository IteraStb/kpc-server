'use strict';

require('colors');

var express       = require('express');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');

var config = require('./config.json');
var routes = require('./libs/routes');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:'+config.db.port+'/kn_list_app');
mongoose.connection.on('open', function(){
    console.log('Connection to db is opened.'.green);
});
mongoose.connection.on('error',
    console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.use(cookieParser('S3CRE7'));
app.use(cookieSession({
    key: 'app.sess',
    secret: 'SUPERseсret'
}));

app.get('/login',  routes.sessions.create);
app.get('/logout', routes.sessions.delete);

app.get('/users',  routes.sessions.isExist, routes.users.index);
app.get('/roles',  routes.sessions.isExist, routes.roles.index);
app.get('/topics', routes.sessions.isExist, routes.topics.index);

//for testing only
app.get('/logs', function(req, res) {
    res.sendFile(__dirname+'/data/knowledge-list-log.json');
});

app.get('/users/show/:id', routes.users.show);

app.get('/menu', function(req, res) { // TODO : make seperate route for menu
    var role = req.param('role');
    res.sendFile(__dirname+'/data/menu/'+role+'.json');
});

app.listen(config.server.port, function(){
    console.log('Express server listening on http://localhost:%d.'.cyan, config.server.port);
});
