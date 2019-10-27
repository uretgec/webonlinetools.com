"use strict";

var lib = require('./lib');

try
{
    var data = lib.loadDatabase();
    lib.generator('sitemap', data);
    lib.generator('index', data);
    lib.generator('posts', data);
    lib.generator('pages', data);
    lib.generator('error', data);
    // console.log(data);
} catch (e) {
    console.log(e);
}