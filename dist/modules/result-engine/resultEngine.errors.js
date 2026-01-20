"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ResultEngineError = void 0;
class ResultEngineError extends Error {
    constructor(message) {
        super(message);
        this.name = "ResultEngineError";
    }
}
exports.ResultEngineError = ResultEngineError;
class ValidationError extends ResultEngineError {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=resultEngine.errors.js.map