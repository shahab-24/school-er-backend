export declare const ResultConfigService: {
    create(payload: any): Promise<import("mongoose").Document<unknown, {}, {
        session: string;
        version: number;
        isActive: boolean;
        class: number;
        exams: import("mongoose").Types.DocumentArray<{
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }> & {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: Map<string, number> | null | undefined;
        };
        passRules?: {
            passPercentage: number;
            failIfAnySubjectFail: boolean;
        } | null | undefined;
        grading?: {
            type: "percentage" | "gpa";
            scale: import("mongoose").Types.DocumentArray<{
                min: number;
                label: string;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min: number;
                label: string;
                point?: number | null | undefined;
            }> & {
                min: number;
                label: string;
                point?: number | null | undefined;
            }>;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
    }> & {
        session: string;
        version: number;
        isActive: boolean;
        class: number;
        exams: import("mongoose").Types.DocumentArray<{
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }> & {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: Map<string, number> | null | undefined;
        };
        passRules?: {
            passPercentage: number;
            failIfAnySubjectFail: boolean;
        } | null | undefined;
        grading?: {
            type: "percentage" | "gpa";
            scale: import("mongoose").Types.DocumentArray<{
                min: number;
                label: string;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min: number;
                label: string;
                point?: number | null | undefined;
            }> & {
                min: number;
                label: string;
                point?: number | null | undefined;
            }>;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getActive(session: string, cls: number): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        version: number;
        isActive: boolean;
        class: number;
        exams: import("mongoose").Types.DocumentArray<{
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }> & {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: {
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
            } | null | undefined;
        };
        passRules?: {
            passPercentage: number;
            failIfAnySubjectFail: boolean;
        } | null | undefined;
        grading?: {
            type: "percentage" | "gpa";
            scale: import("mongoose").Types.DocumentArray<{
                min: number;
                label: string;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min: number;
                label: string;
                point?: number | null | undefined;
            }> & {
                min: number;
                label: string;
                point?: number | null | undefined;
            }>;
        } | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    list(session?: string, cls?: number): Promise<(import("mongoose").FlattenMaps<{
        session: string;
        version: number;
        isActive: boolean;
        class: number;
        exams: import("mongoose").Types.DocumentArray<{
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }> & {
            key: string;
            required: boolean;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: {
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
            } | null | undefined;
        };
        passRules?: {
            passPercentage: number;
            failIfAnySubjectFail: boolean;
        } | null | undefined;
        grading?: {
            type: "percentage" | "gpa";
            scale: import("mongoose").Types.DocumentArray<{
                min: number;
                label: string;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min: number;
                label: string;
                point?: number | null | undefined;
            }> & {
                min: number;
                label: string;
                point?: number | null | undefined;
            }>;
        } | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
