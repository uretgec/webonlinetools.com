"use strict";

var crypto = require('crypto');
var fs = require('fs');
var dbPath = '../db';

exports.response = function(status, data){
    return {
        status: status || false,
        result: data || null
    };
};

exports.guid = function () {
    return crypto.randomBytes(16).toString("hex");
};

exports.getList = function (type) {
    var path = dbPath + '/' + type;
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path, true);
    }
    var files = fs.readdirSync(path);
    var result = [];
    if(files.length > 0) {
        files.forEach(function (file) {
            var content = JSON.parse(fs.readFileSync(path + '/' + file));
            result.push([content.ordered, {
                ordered: content.ordered,
                id: content.id,
                title: content.title,
                status: content.status
            }]);
        });

        // Order by Ordered Key
        var orderedKeys = [];
        result
            .sort(function (a, b) {
                return a[0]-b[0];
            })
            .forEach(function (k) {
                orderedKeys.push(k[1]);
            }
        );
    }

    return result.reverse();
};

exports.isExists = function (type, id) {
    var file = dbPath + '/' + type + '/' + id + '.json';
    return (!fs.existsSync(file)) ? false : file;
};

exports.upsert = function (type, obj) {
    var date = new Date();
    var timestamp = date.getTime()/1000|0;

    if(obj.id === 'new') {
        obj.id = this.guid();
    }

    var path = dbPath + '/' + type;
    var filename = path + '/' + obj.id + '.json';
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path, true);
    }

    // Update Date
    obj.updated_at = timestamp;

    // Upsert Data
    fs.writeFileSync(filename, JSON.stringify(obj, null, 4));
    return {
        id: obj.id
    };
};