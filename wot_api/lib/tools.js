"use strict";

//var crypto = require('crypto');
var qs = require('querystring');
var crc = require('../vendor/crc');
var md = require('../vendor/md');
var sha = require('../vendor/sha');
var base = require('../vendor/base');
var cron = require('../vendor/cron');
var url = require('../vendor/url');
var enums = require('./enums');


exports.hashSeries = function (data) {
    var hash = null;
    if( !data.hasOwnProperty('wot_type') || !data.hasOwnProperty('wot_string') ) {
        return hash;
    }

    switch (data.wot_type)
    {
        case enums.CRC1:
            hash = crc.crc1(data.wot_string).toString(16);
            break;
        case enums.CRC8:
            hash = crc.crc8(data.wot_string).toString(16);
            break;
        case enums.CRC81WIRE:
            hash = crc.crc81wire(data.wot_string).toString(16);
            break;
        case enums.CRC16:
            hash = crc.crc16(data.wot_string).toString(16);
            break;
        case enums.CRC16CCITT:
            hash = crc.crc16ccitt(data.wot_string).toString(16);
            break;
        case enums.CRC16MODBUS:
            hash = crc.crc16modbus(data.wot_string).toString(16);
            break;
        case enums.CRC16KERMIT:
            hash = crc.crc16kermit(data.wot_string).toString(16);
            break;
        case enums.CRC16XMODEM:
            hash = crc.crc16xmodem(data.wot_string).toString(16);
            break;
        case enums.CRC24:
            hash = crc.crc24(data.wot_string).toString(16);
            break;
        case enums.CRC32:
            hash = crc.crc32(data.wot_string).toString(16);
            break;
        case enums.CRCJAM:
            hash = crc.crcjam(data.wot_string).toString(16);
            break;
        case enums.MD2:
            hash = md.md2(data.wot_string);
            break;
        case enums.MD4:
            hash = md.md4(data.wot_string);
            break;
        case enums.MD5:
            hash = md.md5(data.wot_string);
            break;
        case enums.SHA1:
            hash = sha.sha1(data.wot_string);
            break;
        case enums.SHA3_224:
            hash = sha.sha3_224(data.wot_string);
            break;
        case enums.SHA3_256:
            hash = sha.sha3_256(data.wot_string);
            break;
        case enums.SHA3_384:
            hash = sha.sha3_384(data.wot_string);
            break;
        case enums.SHA3_512:
            hash = sha.sha3_512(data.wot_string);
            break;
        case enums.KECCAK_224:
            hash = sha.keccak_224(data.wot_string);
            break;
        case enums.KECCAK_256:
            hash = sha.keccak_256(data.wot_string);
            break;
        case enums.KECCAK_384:
            hash = sha.keccak_384(data.wot_string);
            break;
        case enums.KECCAK_512:
            hash = sha.keccak_512(data.wot_string);
            break;
        case enums.SHAKE_128:
            hash = sha.shake_128(data.wot_string);
            break;
        case enums.SHAKE_256:
            hash = sha.shake_256(data.wot_string);
            break;
        case enums.CSHAKE_128:
            hash = sha.cshake_128(data.wot_string);
            break;
        case enums.CSHAKE_256:
            hash = sha.cshake_256(data.wot_string);
            break;
        case enums.KMAC128:
            hash = sha.kmac128(data.wot_string);
            break;
        case enums.KMAC256:
            hash = sha.kmac256(data.wot_string);
            break;
        case enums.SHA224:
            hash = sha.sha224(data.wot_string);
            break;
        case enums.SHA256:
            hash = sha.sha256(data.wot_string);
            break;
        case enums.SHA384:
            hash = sha.sha384(data.wot_string);
            break;
        case enums.SHA512:
            hash = sha.sha512(data.wot_string);
            break;
        case enums.SHA512_224:
            hash = sha.sha512_224(data.wot_string);
            break;
        case enums.SHA512_256:
            hash = sha.sha512_256(data.wot_string);
            break;
    }

    return hash;
};

exports.baseSeries = function(data) {
    var hash = null;
    if( !data.hasOwnProperty('wot_type') || !data.hasOwnProperty('wot_string') ) {
        return hash;
    }

    switch (data.wot_type)
    {
        case enums.BASE32_ENCODE:
            hash = base.base32.encode(data.wot_string);
            break;
        case enums.BASE32_DECODE:
            hash = base.base32.decode(data.wot_string);
            break;
        case enums.BASE64_ENCODE:
            hash = base.base64.encode(data.wot_string);
            break;
        case enums.HTML_ENCODE:
            hash = base.html.encode(data.wot_string, {
                'encodeEverything': false,
                'useNamedReferences': true,
                'strict': false,
                'allowUnsafeSymbols': true
            });
            break;
        case enums.HTML_DECODE:
            hash = base.html.decode(data.wot_string);
            break;
        case enums.URI_ENCODE:
            hash = qs.escape(data.wot_string);
            break;
        case enums.URI_DECODE:
            hash = qs.unescape(data.wot_string);
            break;
    }

    return hash;
};

exports.cronSeries = function(data) {
    var hash = null;
    if( !data.hasOwnProperty('wot_type') || !data.hasOwnProperty('wot_string') ) {
        return hash;
    }
    switch (data.wot_type)
    {
        case enums.CRON_PARSER:
            hash = cron.cronstrue.toString(data.wot_string);
            break;
    }

    return hash;
};

exports.urlSeries = function(data) {
    var hash = null;
    if( !data.hasOwnProperty('wot_type') || !data.hasOwnProperty('wot_string') ) {
        return hash;
    }
    switch (data.wot_type)
    {
        case enums.URL_PARSER:
            hash = url.urlprs.parse(data.wot_string);
            break;
    }

    return hash;
};

// exports.slug = function(text) {
//     return text.toString().toLowerCase()
//         .replace(/\s+/g, '-')        // Replace spaces with -
//         .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
//         .replace(/\-\-+/g, '-')      // Replace multiple - with single -
//         .replace(/^-+/, '')          // Trim - from start of text
//         .replace(/-+$/, '');         // Trim - from end of text
// };
// exports.randomBytes = function(length) {
//     return crypto.randomBytes(length);
// };
// exports.randomInteger = function(length) {
//     return this.randomBytes(length).toString('hex');
// };
// exports.randomFloat = function(length) {
//     return this.randomBytes(length).toString('hex');
// };
// exports.randomString = function(length) {
//     return this.randomBytes(length).toString('hex');
// };
// exports.randomHash = function(length) {
//     return this.randomBytes(length).toString('hex');
// };
// exports.randomPassword = function(length) {
//     return this.randomBytes(length).toString('hex');
// };
// exports.randomColorHex = function() {
//     return '#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
// };