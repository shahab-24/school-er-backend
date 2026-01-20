import { Schema } from "mongoose";
export declare const AcademicRecord: import("mongoose").Model<{
    session: string;
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    session: string;
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    session: string;
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    session: string;
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    session: string;
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    session: string;
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
