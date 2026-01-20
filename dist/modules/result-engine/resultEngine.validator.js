"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
exports.validateRecordAgainstConfig = validateRecordAgainstConfig;
const resultEngine_errors_1 = require("./resultEngine.errors");
function validateConfig(cfg) {
    const examKeys = new Set(cfg.exams.map((e) => e.key));
    // normalization examKey must exist
    for (const n of cfg.normalization) {
        if (!examKeys.has(n.examKey)) {
            throw new resultEngine_errors_1.ValidationError(`Normalization examKey not found: ${n.examKey}`);
        }
        if (n.from <= 0 || n.to <= 0) {
            throw new resultEngine_errors_1.ValidationError(`Invalid normalization scale for ${n.examKey}`);
        }
    }
    // aggregation rules sanity
    if (cfg.aggregation.type === "average" && !cfg.aggregation.examKeys?.length) {
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
    const examDefs = new Map(cfg.exams.map((e) => [e.key, e]));
    for (const [subjectId, exams] of Object.entries(record.marks)) {
        for (const [examKey, obtained] of Object.entries(exams)) {
            const def = examDefs.get(examKey);
            if (!def) {
                throw new resultEngine_errors_1.ValidationError(`Unknown examKey '${examKey}' for subject ${subjectId}`);
            }
            if (obtained < 0 || obtained > def.totalMarks) {
                throw new resultEngine_errors_1.ValidationError(`Invalid marks ${obtained}/${def.totalMarks} for ${examKey} (${subjectId})`);
            }
        }
        // required exams present?
        for (const def of cfg.exams) {
            if (def.required && exams[def.key] == null) {
                throw new resultEngine_errors_1.ValidationError(`Missing required exam '${def.key}' for subject ${subjectId}`);
            }
        }
    }
}
//# sourceMappingURL=resultEngine.validator.js.map