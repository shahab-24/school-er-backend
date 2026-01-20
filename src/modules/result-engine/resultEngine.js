"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateResults = calculateResults;
var resultEngine_validator_1 = require("./resultEngine.validator");
var resultEngine_errors_1 = require("./resultEngine.errors");
function normalize(obtained, from, to) {
    return (obtained * to) / from;
}
function aggregate(values, cfg) {
    var _a = cfg.aggregation, type = _a.type, examKeys = _a.examKeys, weights = _a.weights;
    if (type === "sum") {
        return Object.values(values).reduce(function (a, b) { return a + b; }, 0);
    }
    if (type === "average") {
        var keys = examKeys;
        var picked = keys.map(function (k) { return values[k]; }).filter(function (v) { return v != null; });
        if (!picked.length)
            return 0;
        return picked.reduce(function (a, b) { return a + b; }, 0) / picked.length;
    }
    if (type === "weighted") {
        var totalWeight = 0;
        var sum = 0;
        for (var _i = 0, _b = Object.entries(weights); _i < _b.length; _i++) {
            var _c = _b[_i], k = _c[0], w = _c[1];
            if (values[k] != null) {
                totalWeight += w;
                sum += values[k] * w;
            }
        }
        if (!totalWeight)
            return 0;
        return sum / totalWeight;
    }
    throw new resultEngine_errors_1.ResultEngineError("Unknown aggregation type");
}
function calculateResults(records, cfg, options) {
    var _a, _b, _c, _d;
    (0, resultEngine_validator_1.validateConfig)(cfg);
    var normMap = new Map(cfg.normalization.map(function (n) { return [n.examKey, n]; }));
    var maxTotal = cfg.exams.reduce(function (s, e) { var _a, _b; return s + ((_b = (_a = normMap.get(e.key)) === null || _a === void 0 ? void 0 : _a.to) !== null && _b !== void 0 ? _b : 0); }, 0);
    var results = [];
    for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var rec = records_1[_i];
        (0, resultEngine_validator_1.validateRecordAgainstConfig)(rec, cfg);
        var subjectsOut = {};
        var studentTotal = 0;
        var anySubjectFail = false;
        for (var _e = 0, _f = Object.entries(rec.marks); _e < _f.length; _e++) {
            var _g = _f[_e], subjectId = _g[0], exams = _g[1];
            var normalized = {};
            for (var _h = 0, _j = Object.entries(exams); _h < _j.length; _h++) {
                var _k = _j[_h], examKey = _k[0], obtained = _k[1];
                // terminal-aware filter (optional)
                if (options.scope === "terminal" && options.terminalKeyPrefix) {
                    if (!examKey.startsWith(options.terminalKeyPrefix))
                        continue;
                }
                var n = normMap.get(examKey);
                if (!n)
                    continue; // exam not contributing to this config
                normalized[examKey] = normalize(obtained, n.from, n.to);
            }
            var final = aggregate(normalized, cfg);
            var failed_1 = ((_a = cfg.passRules) === null || _a === void 0 ? void 0 : _a.failIfAnySubjectFail)
                ? final < ((_c = (_b = cfg.passRules) === null || _b === void 0 ? void 0 : _b.passPercentage) !== null && _c !== void 0 ? _c : 33)
                : false;
            if (failed_1)
                anySubjectFail = true;
            subjectsOut[subjectId] = { normalized: normalized, final: final, failed: failed_1 };
            studentTotal += final;
        }
        var percentage = maxTotal > 0 ? (studentTotal / maxTotal) * 100 : 0;
        var failed = ((_d = cfg.passRules) === null || _d === void 0 ? void 0 : _d.failIfAnySubjectFail) ? anySubjectFail : false;
        results.push({
            studentId: rec.studentId,
            subjects: subjectsOut,
            total: studentTotal,
            percentage: percentage,
            failed: failed,
        });
    }
    return results;
}
