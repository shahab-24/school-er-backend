import { z } from "zod";
export declare const publishSnapshotSchema: z.ZodObject<{
    scope: z.ZodEnum<["terminal", "annual"]>;
    terminalKey: z.ZodOptional<z.ZodString>;
    session: z.ZodString;
    class: z.ZodNumber;
    resultConfigId: z.ZodString;
    results: z.ZodArray<z.ZodObject<{
        studentId: z.ZodString;
        academicRecordId: z.ZodString;
        subjects: z.ZodArray<z.ZodObject<{
            subjectId: z.ZodString;
            normalized: z.ZodRecord<z.ZodString, z.ZodNumber>;
            final: z.ZodNumber;
            failed: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            subjectId: string;
            normalized: Record<string, number>;
            final: number;
            failed?: boolean | undefined;
        }, {
            subjectId: string;
            normalized: Record<string, number>;
            final: number;
            failed?: boolean | undefined;
        }>, "many">;
        total: z.ZodNumber;
        percentage: z.ZodNumber;
        failed: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        studentId: string;
        failed: boolean;
        academicRecordId: string;
        subjects: {
            subjectId: string;
            normalized: Record<string, number>;
            final: number;
            failed?: boolean | undefined;
        }[];
        total: number;
        percentage: number;
    }, {
        studentId: string;
        failed: boolean;
        academicRecordId: string;
        subjects: {
            subjectId: string;
            normalized: Record<string, number>;
            final: number;
            failed?: boolean | undefined;
        }[];
        total: number;
        percentage: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    session: string;
    class: number;
    scope: "terminal" | "annual";
    resultConfigId: string;
    results: {
        studentId: string;
        failed: boolean;
        academicRecordId: string;
        subjects: {
            subjectId: string;
            normalized: Record<string, number>;
            final: number;
            failed?: boolean | undefined;
        }[];
        total: number;
        percentage: number;
    }[];
    terminalKey?: string | undefined;
}, {
    session: string;
    class: number;
    scope: "terminal" | "annual";
    resultConfigId: string;
    results: {
        studentId: string;
        failed: boolean;
        academicRecordId: string;
        subjects: {
            subjectId: string;
            normalized: Record<string, number>;
            final: number;
            failed?: boolean | undefined;
        }[];
        total: number;
        percentage: number;
    }[];
    terminalKey?: string | undefined;
}>;
