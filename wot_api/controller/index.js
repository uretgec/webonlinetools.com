'use strict';

var base = require('../lib/base');
var tools = require('../lib/tools');
var routes = require('../lib/routes');
var schemas = require('../lib/schemas');
var Ajv = require('ajv');
var ajv = new Ajv({coerceTypes: true});

exports.healthCheck = function (req, res, next) {
  res.send('OK');
};

exports.hashSeries = function (req, res, next) {
    var response = base.response();
    var isValid = ajv.validate(schemas.schema_base, req.body);
    if (isValid) {
        response.status = true;
        response.result = tools.hashSeries(req.body);
    }

    res.json(response).end();
};

exports.baseSeries = function (req, res, next) {
    var response = base.response();
    var isValid = ajv.validate(schemas.schema_base, req.body);
    if (isValid) {
        response.status = true;
        response.result = tools.baseSeries(req.body);
    }

    res.json(response).end();
};

exports.cronSeries = function (req, res, next) {
    var response = base.response();
    var isValid = ajv.validate(schemas.schema_base, req.body);
    if (isValid) {
        response.status = true;
        response.result = tools.cronSeries(req.body);
    }

    res.json(response).end();
};

exports.urlSeries = function (req, res, next) {
    var response = base.response();
    var isValid = ajv.validate(schemas.schema_base, req.body);
    if (isValid) {
        response.status = true;
        response.result = JSON.stringify(tools.urlSeries(req.body));
    }

    res.json(response).end();
};

// exports.slug = function (req, res, next) {
// };

// exports.randomInteger = function (req, res, next) {
// };
//
// exports.randomFloat = function (req, res, next) {
// };
//
// exports.randomString = function (req, res, next) {
// };
//
// exports.randomHash = function (req, res, next) {
// };
//
// exports.randomPassword = function (req, res, next) {
// };

exports.routes = routes;