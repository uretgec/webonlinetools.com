'use strict';

module.exports = {
    sha1: require('./sha1'),
    sha3_224: require('./sha3').sha3_224,
    sha3_256: require('./sha3').sha3_256,
    sha3_384: require('./sha3').sha3_384,
    sha3_512: require('./sha3').sha3_512,
    keccak_224: require('./sha3').keccak_224,
    keccak_256: require('./sha3').keccak_256,
    keccak_384: require('./sha3').keccak_384,
    keccak_512: require('./sha3').keccak_512,
    shake_128: require('./sha3').shake_128,
    shake_256: require('./sha3').shake_256,
    cshake_128: require('./sha3').cshake_128,
    cshake_256: require('./sha3').cshake_256,
    kmac128: require('./sha3').kmac128,
    sha224: require('./sha256').sha224,
    sha256: require('./sha256').sha256,
    sha384: require('./sha512').sha384,
    sha512: require('./sha512').sha512,
    sha512_224: require('./sha512').sha512_224,
    sha512_256: require('./sha512').sha512_256,
};