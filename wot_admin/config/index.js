"use strict";

var config = {
    env: process.env.NODE_ENV || 'production',
    port: process.env.WOT_PORT || 8444,
    host: process.env.WOT_HOST || 'localhost',
    domain: process.env.WOT_DOMAIN || 'http://webonlinetools.com',
    secret: process.env.WOT_SECRET || '',
    lifetime: process.env.WOT_COOKIE_LIFETIME || 86400
};

module.exports = config;