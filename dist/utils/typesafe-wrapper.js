"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJwtSign = safeJwtSign;
exports.safeArchiveAppend = safeArchiveAppend;
exports.convertMapToRecord = convertMapToRecord;
exports.convertForCalculation = convertForCalculation;
exports.safeString = safeString;
exports.safeNumber = safeNumber;
// 1. Fix JWT secret type
function safeJwtSign(payload, secret, options) {
    const jwt = require("jsonwebtoken");
    return jwt.sign(payload, secret, options);
}
// 2. Fix archiver Buffer issue
function safeArchiveAppend(archive, data, options) {
    if (data instanceof Uint8Array) {
        const buffer = Buffer.from(data);
        archive.append(buffer, options);
    }
    else {
        archive.append(data, options);
    }
}
// 3. Fix Map to Record - IMPORTANT: Return Map | Record based on input
function convertMapToRecord(map) {
    if (!map)
        return undefined;
    if (map instanceof Map) {
        const record = {};
        for (const [key, value] of map.entries()) {
            record[key] = value;
        }
        return record;
    }
    return map;
}
// 4. Type-safe conversion that preserves Map if needed
function convertForCalculation(config) {
    const plain = config.toObject ? config.toObject() : config;
    if (plain.aggregation?.weights instanceof Map) {
        const weights = {};
        for (const [key, value] of plain.aggregation.weights.entries()) {
            weights[key] = value;
        }
        plain.aggregation.weights = weights;
    }
    return plain;
}
// 5. Safe string/number
function safeString(value) {
    if (value === null || value === undefined)
        return undefined;
    const str = String(value);
    return str.trim() || undefined;
}
function safeNumber(value) {
    if (value === null || value === undefined)
        return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
}
//# sourceMappingURL=typesafe-wrapper.js.map