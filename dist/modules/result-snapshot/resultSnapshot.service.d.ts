export declare const ResultSnapshotService: {
    publish(payload: any): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, {
        session: string;
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        publishedAt: NativeDate;
        failed: boolean;
        resultConfigId: import("mongoose").Types.ObjectId;
        academicRecordId: import("mongoose").Types.ObjectId;
        subjects: import("mongoose").Types.DocumentArray<{
            subjectId: string;
            normalized: Map<string, number>;
            final: number;
            failed: boolean;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            subjectId: string;
            normalized: Map<string, number>;
            final: number;
            failed: boolean;
        }> & {
            subjectId: string;
            normalized: Map<string, number>;
            final: number;
            failed: boolean;
        }>;
        total: number;
        percentage: number;
        terminalKey?: string | null | undefined;
        position?: number | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
    }> & {
        session: string;
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        publishedAt: NativeDate;
        failed: boolean;
        resultConfigId: import("mongoose").Types.ObjectId;
        academicRecordId: import("mongoose").Types.ObjectId;
        subjects: import("mongoose").Types.DocumentArray<{
            subjectId: string;
            normalized: Map<string, number>;
            final: number;
            failed: boolean;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            subjectId: string;
            normalized: Map<string, number>;
            final: number;
            failed: boolean;
        }> & {
            subjectId: string;
            normalized: Map<string, number>;
            final: number;
            failed: boolean;
        }>;
        total: number;
        percentage: number;
        terminalKey?: string | null | undefined;
        position?: number | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, Omit<any, "_id">>[]>;
    listByClass(params: {
        scope: "terminal" | "annual";
        terminalKey?: string;
        session: string;
        class: number;
    }): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        publishedAt: NativeDate;
        failed: boolean;
        resultConfigId: import("mongoose").Types.ObjectId;
        academicRecordId: import("mongoose").Types.ObjectId;
        subjects: import("mongoose").Types.DocumentArray<{
            subjectId: string;
            normalized: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            };
            final: number;
            failed: boolean;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            subjectId: string;
            normalized: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            };
            final: number;
            failed: boolean;
        }> & {
            subjectId: string;
            normalized: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            };
            final: number;
            failed: boolean;
        }>;
        total: number;
        percentage: number;
        terminalKey?: string | null | undefined;
        position?: number | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getStudent(params: {
        studentId: string;
        scope: "terminal" | "annual";
        terminalKey?: string;
        session: string;
    }): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        studentId: string;
        class: number;
        scope: "terminal" | "annual";
        publishedAt: NativeDate;
        failed: boolean;
        resultConfigId: import("mongoose").Types.ObjectId;
        academicRecordId: import("mongoose").Types.ObjectId;
        subjects: import("mongoose").Types.DocumentArray<{
            subjectId: string;
            normalized: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            };
            final: number;
            failed: boolean;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            subjectId: string;
            normalized: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            };
            final: number;
            failed: boolean;
        }> & {
            subjectId: string;
            normalized: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            };
            final: number;
            failed: boolean;
        }>;
        total: number;
        percentage: number;
        terminalKey?: string | null | undefined;
        position?: number | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
