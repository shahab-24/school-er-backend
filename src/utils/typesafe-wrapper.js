"use strict";
// Type-safe wrapper functions to fix TypeScript errors
// WITHOUT breaking existing workflow
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJwtSign = safeJwtSign;
exports.safeArchiveAppend = safeArchiveAppend;
exports.convertMapToRecord = convertMapToRecord;
exports.safeString = safeString;
exports.safeNumber = safeNumber;
// 1. Fix for JWT secret type issue
function safeJwtSign(payload, secret, options) {
    var jwt = require('jsonwebtoken');
    return jwt.sign(payload, secret, options);
}
// 2. Fix for archiver append Buffer issue
function safeArchiveAppend(archive, data, options) {
    if (data instanceof Uint8Array) {
        // Convert Uint8Array to Buffer safely
        var buffer = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
        archive.append(buffer, options);
    }
    else {
        archive.append(data, options);
    }
}
// 3. Fix MongoDB Map to Record conversion
function convertMapToRecord(map) {
    if (!map)
        return undefined;
    if (map instanceof Map) {
        var record = {};
        for (var _i = 0, _a = map.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            record[key] = value;
        }
        return record;
    }
    return map;
}
// 4. Safe null/undefined to optional
function safeString(value) {
    return (value === null || value === void 0 ? void 0 : value.toString()) || undefined;
}
function safeNumber(value) {
    var num = Number(value);
    return isNaN(num) ? undefined : num;
}
