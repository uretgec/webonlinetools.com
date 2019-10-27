"use strict";

var fs = require('fs');
var pug = require('pug');
var md = require('jstransformer')(require('jstransformer-markdown-it'));
var dbPath = '../db';

exports.STATUS_PASSIVE = "1";
exports.STATUS_ACTIVE = "2";

exports.loadDatabase = function (encoding) {
    encoding = encoding || 'utf8';
    var self = this;
    var result = [];
    if(!fs.existsSync(dbPath)) {
        return result;
    }
    var folders = fs.readdirSync(dbPath);
    if(folders.length > 0) {
        folders.forEach(function (folder) {
            result[folder] = [];

            if(folder === 'pages') {
                result['index'] = [];
                result['error'] = [];
            }

            var path = dbPath + '/' + folder;
            var files = fs.readdirSync(path);
            if(files.length > 0) {
                files.forEach(function (file) {
                    var content = JSON.parse(fs.readFileSync(path + '/' + file, encoding));
                    if(content.hasOwnProperty('status') && content.status === self.STATUS_ACTIVE) {
                        if(folder === 'options') {
                            result[folder] = content;
                        } else if(folder === 'pages') {
                            switch (content.template)
                            {
                                case 'index':
                                    result[content.template].push(content);
                                    break;
                                case 'page':
                                    result[folder].push(content);
                                    break;
                                case 'error':
                                    result[content.template].push(content);
                                    break;
                            }
                        } else if(folder === 'posts') {
                            result[folder].push([content.ordered, content]);
                        }
                    }
                });
            }

            if(folder === 'posts') {
                result[folder] = self.sortList(result[folder]);
            }
        });
    }
    return result;
};

exports.sortList = function (data) {
    var orderedKeys = [];
    data
        .sort(function (a, b) {
            return a[0]-b[0];
        })
        .forEach(function (k) {
                orderedKeys.push(k[1]);
            }
        );

    return orderedKeys.reverse();
};

exports.merge = function (first, second) {
    return Object.assign(first, second)
};

exports.set = function (path, data, encoding) {
    encoding = encoding || 'utf8';
    fs.writeFile(path, data, encoding, function (err) {
        if (err) throw err;
    });
};

exports.template = function (theme, file) {
    return '../web_generator/themes/'+ theme +  '/views/' + file;
};

exports.render = function (theme, file, data) {
    return pug.renderFile(this.template(theme, file), data);
};

exports.markdown = function (file, encoding) {
    encoding = encoding || 'utf8';
    if(!fs.existsSync(file)) return '';
    return md.render(fs.readFileSync(file, encoding)).body;
};

exports.generator = function (type, data) {
    if(type === 'sitemap') {
        this.set('../wot_web/sitemap.xml', this.render(data.options.theme, 'sitemap.xml.pug', data));
    } else {
        if(data.hasOwnProperty(type)) {
            for (var pKey in data[type]) {
                var pData = data[type][pKey];
                pData.content = md.render(pData.content).body;
                data = this.merge(data, {current: pData});
                this.set(
                    '../wot_web/' + data[type][pKey].slug + '.html',
                    this.render(data.options.theme, pData.template + '.html.pug', data)
                );
            }
        }
    }
};