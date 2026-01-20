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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfigService = void 0;
var resultConfig_model_1 = require("./resultConfig.model");
exports.ResultConfigService = {
    create: function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var last, version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // deactivate previous active config for same session+class
                    return [4 /*yield*/, resultConfig_model_1.ResultConfig.updateMany({ session: payload.session, class: payload.class, isActive: true }, { $set: { isActive: false } })];
                    case 1:
                        // deactivate previous active config for same session+class
                        _a.sent();
                        return [4 /*yield*/, resultConfig_model_1.ResultConfig.findOne({
                                session: payload.session,
                                class: payload.class,
                            })
                                .sort({ version: -1 })
                                .lean()];
                    case 2:
                        last = _a.sent();
                        version = last ? last.version + 1 : 1;
                        return [2 /*return*/, resultConfig_model_1.ResultConfig.create(__assign(__assign({}, payload), { version: version, isActive: true }))];
                }
            });
        });
    },
    getActive: function (session, cls) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, resultConfig_model_1.ResultConfig.findOne({ session: session, class: cls, isActive: true }).lean()];
            });
        });
    },
    list: function (session, cls) {
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                q = {};
                if (session)
                    q.session = session;
                if (cls)
                    q.class = cls;
                return [2 /*return*/, resultConfig_model_1.ResultConfig.find(q).sort({ createdAt: -1 }).lean()];
            });
        });
    },
};
