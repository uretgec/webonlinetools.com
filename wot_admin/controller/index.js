'use strict';

var base = require('../lib/base');
var routes = require('../lib/routes');
var enums = require('../lib/enums');
var fs = require('fs');

exports.restrict = function(req, res, next) {
    // if (req.session.user) {
    //     next();
    // } else {
    //     req.session.error = 'Access denied!';
    //     if(req.method === 'POST') {
    //         res.json(base.generateJsonResponse('AccessDenied', 'Access denied!'));
    //     } else {
    //         res.redirect(routes.LOGIN);
    //     }
    // }

    next();
};

// Main Routes
exports.dashboard = function (req, res) {
    res.render('dashboard.twig', {
        'section' : 'dashboard',
        'title': 'Dashboard'
    });
};
exports.profileGet = function (req, res) {
    res.render('profile.twig', {
        'section' : 'profile',
        'title' : 'Profile',
        'result' : null
    });
};
exports.profilePost = function (req, res) {
    // Json verisi dönecek.
};
exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect(routes.LOGIN);
    });
};
exports.login = function(req, res){
    res.render('login.twig');
};
exports.loginCheck = function(req, res){
    // Check username and password else redirest to login
};

// Post Routes
exports.postList = function (req, res) {
    res.render('Post/list.twig', {
        'section' : 'postlist',
        'title' : 'Post List',
        'result' : base.getList('posts')
    });
};
exports.postGet = function (req, res) {
    var file = base.isExists('posts', req.params.id);
    if(!file && req.params.id !== 'new') {
        res.redirect((routes.POST_LIST).replace(':page?',1));
    } else {
        res.render('Post/edit.twig', {
            'section' : 'postlist',
            'title' : 'Post Add/Edit',
            'result' : (req.params.id !== 'new') ? JSON.parse(fs.readFileSync(file)) : null
        });
    }
};
exports.postPost = function (req, res) {
    res.json(base.upsert('posts', req.body));
};

// Page Routes
exports.pageList = function (req, res) {
    res.render('Page/list.twig', {
        'section' : 'pagelist',
        'title' : 'Page List',
        'result' : base.getList('pages')
    });
};
exports.pageGet = function (req, res) {
    var file = base.isExists('pages', req.params.id);
    if(!file && req.params.id !== 'new') {
        res.redirect((routes.PAGE_LIST).replace(':page?',1));
    } else {
        res.render('Page/edit.twig', {
            'section' : 'pagelist',
            'title' : 'Page Add/Edit',
            'result' : (req.params.id !== 'new') ? JSON.parse(fs.readFileSync(file)) : null
        });
    }
};
exports.pagePost = function (req, res) {
    res.json(base.upsert('pages', req.body));
};

// Options Routes
exports.optionList = function (req, res) {
    res.render('Option/list.twig', {
        'section' : 'optionlist',
        'title' : 'Option List',
        'result' : base.getList('options')
    });
};
exports.optionGet = function (req, res) {
    var file = base.isExists('options', req.params.id);
    if(!file && req.params.id !== 'new') {
        res.redirect((routes.PAGE_LIST).replace(':page?',1));
    } else {
        res.render('Option/edit.twig', {
            'section' : 'optionlist',
            'title' : 'Option Add/Edit',
            'result' : (req.params.id !== 'new') ? JSON.parse(fs.readFileSync(file)) : null
        });
    }
};
exports.optionPost = function (req, res) {
    res.json(base.upsert('options', req.body));
};

// Account Routes
exports.accountList = function (req, res) {
    res.render('Account/list.twig', {
        'section' : 'accountlist',
        'title' : 'Account List',
        'result' : null
    });
};
exports.accountGet = function (req, res) {
    res.render('Account/edit.twig', {
        'section' : 'accountlist',
        'title' : 'Account Add/Edit',
        'result' : null
    });
};
exports.accountPost = function (req, res) {
    // Json verisi dönecek.
};

exports.routes = routes;
exports.enums = enums;