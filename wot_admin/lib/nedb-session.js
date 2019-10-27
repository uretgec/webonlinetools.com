"use strict";

var util = require('util');
var Nedb = require('nedb');

module.exports = function (session) {
    var Store = session.Store;

    function NeDBStore(options) {
        this.datastore = new Nedb(options);
        this.datastore.loadDatabase();
    }

    util.inherits(NeDBStore, Store);

    NeDBStore.prototype.set = function( sid, session, callback ) {
        this.datastore.update(
            { sid: sid },
            { sid: sid, data: data },
            { multi: false, upsert: true },
            function (err) {
                return callback(err);
            }
        );
    };

    NeDBStore.prototype.touch = function( sid, session, callback ) {
        this.datastore.update(
            { sid: sid },
            { sid: sid, data: data },
            { multi: false, upsert: true },
            function (err) {
                return callback(err);
            }
        );
    };

    NeDBStore.prototype.get = function( sid, callback ) {
        this.datastore.findOne(
            { sid: sid },
            function (err, sess) {
                if (err) { return callback(err); }
                if (!sess) { return callback(null, null); }

                return callback(null, sess.data);
            }
        );
    };

    NeDBStore.prototype.all = function( callback ) {
        this.datastore.find(
            {},
            function (err, sess) {
                if (err) { return callback(err); }
                if (!sess) { return callback(null, null); }

                return callback(null, sess.data);
            }
        );
    };

    NeDBStore.prototype.length = function( callback ) {
        this.datastore.count(
            {},
            function(err, count) {
                if (err) { return callback(err); }
                return callback(null, count);
            }
        );
    };

    NeDBStore.prototype.destroy = function( sid, callback ) {
        this.datastore.remove(
            { sid: sid },
            { multi: false },
            function (err) {
                return callback(err);
            }
        );
    };

    NeDBStore.prototype.clear = function( callback ) {
        this.datastore.remove(
            {},
            { multi: true },
            function (err) {
                return callback(err);
            }
        );
    };

    return NeDBStore;
};