"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSheetService = void 0;
var resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
/**
 * Dense ranking:
 * totals sorted desc
 * equal totals => same position
 * next position increments by count of previous uniques
 */
function assignPositions(sorted) {
    var pos = 0;
    var lastTotal = null;
    var rank = 0;
    var map = new Map();
    for (var _i = 0, sorted_1 = sorted; _i < sorted_1.length; _i++) {
        var item = sorted_1[_i];
        if (lastTotal === null || item.total < lastTotal) {
            rank += 1;
            pos = rank;
            lastTotal = item.total;
        }
        map.set(item.studentId, pos);
    }
    return map;
}
exports.ResultSheetService = {
    generate: function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var q, snaps, sorted, posMap, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            scope: query.scope,
                            session: query.session,
                            class: query.class,
                        };
                        if (query.scope === "terminal")
                            q.terminalKey = query.terminalKey;
                        return [4 /*yield*/, resultSnapshot_model_1.ResultSnapshot.find(q)
                                .select("studentId total percentage failed")
                                .lean()];
                    case 1:
                        snaps = _a.sent();
                        if (!snaps.length) {
                            return [2 /*return*/, {
                                    session: query.session,
                                    class: query.class,
                                    scope: query.scope,
                                    terminalKey: query.terminalKey,
                                    rows: [],
                                }];
                        }
                        sorted = __spreadArray([], snaps, true).sort(function (a, b) {
                            if (b.total !== a.total)
                                return b.total - a.total;
                            return b.percentage - a.percentage;
                        });
                        posMap = assignPositions(sorted.map(function (s) { return ({ studentId: s.studentId, total: s.total }); }));
                        rows = sorted.map(function (s) { return ({
                            studentId: s.studentId,
                            total: s.total,
                            percentage: Number(s.percentage.toFixed(2)),
                            position: posMap.get(s.studentId),
                            failed: !!s.failed,
                        }); });
                        return [2 /*return*/, {
                                session: query.session,
                                class: query.class,
                                scope: query.scope,
                                terminalKey: query.terminalKey,
                                rows: rows,
                            }];
                }
            });
        });
    },
    /**
     * Annual sheet with previous terminal comparison (optional).
     * Provide previous scope/key to enrich rows.
     */
    generateWithPrevious: function (current, previous) {
        return __awaiter(this, void 0, void 0, function () {
            var currentSheet, prevSnaps, prevSorted, prevPosMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generate(current)];
                    case 1:
                        currentSheet = _a.sent();
                        return [4 /*yield*/, resultSnapshot_model_1.ResultSnapshot.find({
                                scope: previous.scope,
                                terminalKey: previous.terminalKey,
                                session: previous.session,
                                class: previous.class,
                            })
                                .select("studentId total percentage")
                                .lean()];
                    case 2:
                        prevSnaps = _a.sent();
                        prevSorted = __spreadArray([], prevSnaps, true).sort(function (a, b) {
                            if (b.total !== a.total)
                                return b.total - a.total;
                            return b.percentage - a.percentage;
                        });
                        prevPosMap = assignPositions(prevSorted.map(function (s) { return ({ studentId: s.studentId, total: s.total }); }));
                        currentSheet.rows = currentSheet.rows.map(function (r) { return (__assign(__assign({}, r), { previous: prevPosMap.has(r.studentId)
                                ? { class: previous.class, position: prevPosMap.get(r.studentId) }
                                : undefined })); });
                        return [2 /*return*/, currentSheet];
                }
            });
        });
    },
};
