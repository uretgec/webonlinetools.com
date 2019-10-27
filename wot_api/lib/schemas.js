"use strict";

exports.schema_base = {
    type: "object",
    properties: {
        wot_type: {
            type: ["string"],
            minLength: 32,
            maxLength: 32
        },
        wot_string: {
            type: ["string"],
            minLength: 2,
            maxLength: 255
        }
    },
    required: ["wot_type","wot_string"],
    additionalProperties: false
};