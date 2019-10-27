"use strict";

exports.parse = function (data) {
    var URL = require('url');
    return URL.parse(data, true, true);
};