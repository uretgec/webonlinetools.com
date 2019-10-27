"use strict";

exports.response = function(status, data){
    return {
        status: status || false,
        result: data || null
    };
};