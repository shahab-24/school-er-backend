import { Schema } from "mongoose";
export declare const User: import("mongoose").Model<{
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
    isActive: boolean;
    email?: string | null | undefined;
    passwordHash?: string | null | undefined;
    studentUid?: string | null | undefined;
    teacherId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
    isActive: boolean;
    email?: string | null | undefined;
    passwordHash?: string | null | undefined;
    studentUid?: string | null | undefined;
    teacherId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
    isActive: boolean;
    email?: string | null | undefined;
    passwordHash?: string | null | undefined;
    studentUid?: string | null | undefined;
    teacherId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
    isActive: boolean;
    email?: string | null | undefined;
    passwordHash?: string | null | undefined;
    studentUid?: string | null | undefined;
    teacherId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
    isActive: boolean;
    email?: string | null | undefined;
    passwordHash?: string | null | undefined;
    studentUid?: string | null | undefined;
    teacherId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
    isActive: boolean;
    email?: string | null | undefined;
    passwordHash?: string | null | undefined;
    studentUid?: string | null | undefined;
    teacherId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
