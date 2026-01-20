export declare const AcademicRecordService: {
    upsertDraft(payload: any): Promise<import("mongoose").FlattenMaps<{
        session: string;
        status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        marks: {};
        terminalKey?: string | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        publishedAt?: NativeDate | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    submit(q: any): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        marks: {};
        terminalKey?: string | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        publishedAt?: NativeDate | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    unlock(q: any): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        marks: {};
        terminalKey?: string | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        publishedAt?: NativeDate | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    publish(query: any, actor: any): Promise<{
        success: boolean;
    }>;
    listByClass(filter: any): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        marks: {};
        terminalKey?: string | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        publishedAt?: NativeDate | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
