"use strict";

module.exports = {
    // Main Routes
    DASHBOARD : '/',
    PROFILE_GET : '/me',
    PROFILE_POST : '/me',
    LOGIN : '/login',
    LOGIN_CHECK : '/login-check',
    LOGOUT : '/logout',

    // Option Routes
    OPTION_LIST : '/options/:page?',
    OPTION_GET : '/option/:id',
    OPTION_POST : '/option/:id',

    // Post&Page Routes
    POST_LIST : '/posts/:page?',
    POST_GET : '/post/:id',
    POST_POST : '/post/:id',

    PAGE_LIST : '/pages/:page?',
    PAGE_GET : '/page/:id',
    PAGE_POST : '/page/:id',

    // Account Routes
    ACCOUNT_LIST : '/accounts/:page?',
    ACCOUNT_GET : '/account/:id',
    ACCOUNT_POST : '/account/:id'
};