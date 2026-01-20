import { z } from "zod";
export declare const examSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    totalMarks: z.ZodNumber;
    required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    key: string;
    label: string;
    totalMarks: number;
    required?: boolean | undefined;
}, {
    key: string;
    label: string;
    totalMarks: number;
    required?: boolean | undefined;
}>;
export declare const normalizationSchema: z.ZodObject<{
    examKey: z.ZodString;
    from: z.ZodNumber;
    to: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    examKey: string;
    from: number;
    to: number;
}, {
    examKey: string;
    from: number;
    to: number;
}>;
export declare const aggregationSchema: z.ZodObject<{
    type: z.ZodEnum<["sum", "average", "weighted"]>;
    examKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    weights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    type: "sum" | "average" | "weighted";
    weights?: Record<string, number> | undefined;
    examKeys?: string[] | undefined;
}, {
    type: "sum" | "average" | "weighted";
    weights?: Record<string, number> | undefined;
    examKeys?: string[] | undefined;
}>;
export declare const createResultConfigSchema: z.ZodObject<{
    session: z.ZodString;
    class: z.ZodNumber;
    exams: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        totalMarks: z.ZodNumber;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        totalMarks: number;
        required?: boolean | undefined;
    }, {
        key: string;
        label: string;
        totalMarks: number;
        required?: boolean | undefined;
    }>, "many">;
    normalization: z.ZodArray<z.ZodObject<{
        examKey: z.ZodString;
        from: z.ZodNumber;
        to: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        examKey: string;
        from: number;
        to: number;
    }, {
        examKey: string;
        from: number;
        to: number;
    }>, "many">;
    aggregation: z.ZodObject<{
        type: z.ZodEnum<["sum", "average", "weighted"]>;
        examKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        weights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        type: "sum" | "average" | "weighted";
        weights?: Record<string, number> | undefined;
        examKeys?: string[] | undefined;
    }, {
        type: "sum" | "average" | "weighted";
        weights?: Record<string, number> | undefined;
        examKeys?: string[] | undefined;
    }>;
    passRules: z.ZodOptional<z.ZodObject<{
        passPercentage: z.ZodNumber;
        failIfAnySubjectFail: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    }, {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    }>>;
    grading: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["percentage", "gpa"]>;
        scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
            min: z.ZodNumber;
            label: z.ZodString;
            point: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            label: string;
            point?: number | undefined;
        }, {
            min: number;
            label: string;
            point?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "percentage" | "gpa";
        scale?: {
            min: number;
            label: string;
            point?: number | undefined;
        }[] | undefined;
    }, {
        type: "percentage" | "gpa";
        scale?: {
            min: number;
            label: string;
            point?: number | undefined;
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    session: string;
    class: number;
    exams: {
        key: string;
        label: string;
        totalMarks: number;
        required?: boolean | undefined;
    }[];
    normalization: {
        examKey: string;
        from: number;
        to: number;
    }[];
    aggregation: {
        type: "sum" | "average" | "weighted";
        weights?: Record<string, number> | undefined;
        examKeys?: string[] | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale?: {
            min: number;
            label: string;
            point?: number | undefined;
        }[] | undefined;
    } | undefined;
}, {
    session: string;
    class: number;
    exams: {
        key: string;
        label: string;
        totalMarks: number;
        required?: boolean | undefined;
    }[];
    normalization: {
        examKey: string;
        from: number;
        to: number;
    }[];
    aggregation: {
        type: "sum" | "average" | "weighted";
        weights?: Record<string, number> | undefined;
        examKeys?: string[] | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale?: {
            min: number;
            label: string;
            point?: number | undefined;
        }[] | undefined;
    } | undefined;
}>;
