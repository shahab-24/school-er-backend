"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
exports.validateRecordAgainstConfig = validateRecordAgainstConfig;
var resultEngine_errors_1 = require("./resultEngine.errors");
function validateConfig(cfg) {
    var _a;
    var examKeys = new Set(cfg.exams.map(function (e) { return e.key; }));
    // normalization examKey must exist
    for (var _i = 0, _b = cfg.normalization; _i < _b.length; _i++) {
        var n = _b[_i];
        if (!examKeys.has(n.examKey)) {
            throw new resultEngine_errors_1.ValidationError("Normalization examKey not found: ".concat(n.examKey));
        }
        if (n.from <= 0 || n.to <= 0) {
            throw new resultEngine_errors_1.ValidationError("Invalid normalization scale for ".concat(n.examKey));
        }
    }
    // aggregation rules sanity
    if (cfg.aggregation.type === "average" && !((_a = cfg.aggregation.examKeys) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new resultEngine_errors_1.ValidationError("Average aggregation requires examKeys");
    }
    if (cfg.aggregation.type === "weighted") {
        if (!cfg.aggregation.weights ||
            Object.keys(cfg.aggregation.weights).length === 0) {
            throw new resultEngine_errors_1.ValidationError("Weighted aggregation requires weights");
        }
    }
}
function validateRecordAgainstConfig(record, cfg) {
    var examDefs = new Map(cfg.exams.map(function (e) { return [e.key, e]; }));
    for (var _i = 0, _a = Object.entries(record.marks); _i < _a.length; _i++) {
        var _b = _a[_i], subjectId = _b[0], exams = _b[1];
        for (var _c = 0, _d = Object.entries(exams); _c < _d.length; _c++) {
            var _e = _d[_c], examKey = _e[0], obtained = _e[1];
            var def = examDefs.get(examKey);
            if (!def) {
                throw new resultEngine_errors_1.ValidationError("Unknown examKey '".concat(examKey, "' for subject ").concat(subjectId));
            }
            if (obtained < 0 || obtained > def.totalMarks) {
                throw new resultEngine_errors_1.ValidationError("Invalid marks ".concat(obtained, "/").concat(def.totalMarks, " for ").concat(examKey, " (").concat(subjectId, ")"));
            }
        }
        // required exams present?
        for (var _f = 0, _g = cfg.exams; _f < _g.length; _f++) {
            var def = _g[_f];
            if (def.required && exams[def.key] == null) {
                throw new resultEngine_errors_1.ValidationError("Missing required exam '".concat(def.key, "' for subject ").concat(subjectId));
            }
        }
    }
}
