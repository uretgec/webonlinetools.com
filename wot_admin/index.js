"use strict";

var config = require('./config');
var Controller = require('./controller');
var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var NedbStore = require('./lib/nedb-session');
var app = express();

// App Config Set
app.disable('x-powered-by');
app.enable('trust proxy'); // reverse proxy must trust nginx
app.set('views', path.join(__dirname, 'views'));
app.set('twig options', {strict_variables: false});
app.use(express.static(path.join(__dirname, '/assets')));
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//app.use(bodyParser.json({limit: '1kb'})); // for parsing application/json
// server.use(session({
//     secret: config.secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         path: '/',
//         httpOnly: true,
//         maxAge: 365 * 24 * 3600 * 1000
//     },
//     store: new NedbStore({
//         filename: '../db/sessions.db',
//         timestampData: true
//     })
// }));

app.use(function(req, res, next){
    // var err = req.session.error;
    // var msg = req.session.success;
    //
    // if(err) {
    //     console.log('Session Error');
    // }
    // delete req.session.error;
    // delete req.session.success;
    // res.locals.message = '';
    // if (err) res.locals.message = err;
    // if (msg) res.locals.message = msg;

    // User Data
    // res.locals.currentUser = req.session.user;

    // Enums
    res.locals.routes = Controller.routes;
    res.locals.enumStatus = Controller.enums;

    next();
});

// Main Routes
app.get(Controller.routes.DASHBOARD, Controller.restrict, Controller.dashboard);
app.get(Controller.routes.PROFILE_GET, Controller.restrict, Controller.profileGet);
app.post(Controller.routes.PROFILE_POST, Controller.restrict, Controller.profilePost);
app.get(Controller.routes.LOGOUT, Controller.logout);
app.get(Controller.routes.LOGIN, Controller.login);
app.post(Controller.routes.LOGIN_CHECK, Controller.loginCheck);

// Post Routes
app.get(Controller.routes.POST_LIST, Controller.restrict, Controller.postList);
app.get(Controller.routes.POST_GET, Controller.restrict, Controller.postGet);
app.post(Controller.routes.POST_POST, Controller.restrict, Controller.postPost);

// Page Routes
app.get(Controller.routes.PAGE_LIST, Controller.restrict, Controller.pageList);
app.get(Controller.routes.PAGE_GET, Controller.restrict, Controller.pageGet);
app.post(Controller.routes.PAGE_POST, Controller.restrict, Controller.pagePost);

// Options Routes
app.get(Controller.routes.OPTION_LIST, Controller.restrict, Controller.optionList);
app.get(Controller.routes.OPTION_GET, Controller.restrict, Controller.optionGet);
app.post(Controller.routes.OPTION_POST, Controller.restrict, Controller.optionPost);

// Account Routes
app.get(Controller.routes.ACCOUNT_LIST, Controller.restrict, Controller.accountList);
app.get(Controller.routes.ACCOUNT_GET, Controller.restrict, Controller.accountGet);
app.post(Controller.routes.ACCOUNT_POST, Controller.restrict, Controller.accountPost);

app.use(function(err, req, res, next){
    console.log(err);
    res.status(500).render('Error/500.twig');
});
app.use(function(req, res){
    res.status(404).render('Error/404.twig');
});

app.listen(config.port, config.host,function () {
    console.log('Wot Admin started ' + config.host + ':' + config.port + ' with ' + config.env);
});