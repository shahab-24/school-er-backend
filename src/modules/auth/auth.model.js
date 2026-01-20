"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },
    role: {
        type: String,
        enum: ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "STUDENT", "VIEWER"],
        required: true,
        index: true,
    },
    studentUid: { type: String }, // if role = STUDENT
    teacherId: { type: String }, // future extension
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
