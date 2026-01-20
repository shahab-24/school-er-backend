import { z } from "zod";
export declare const marksSchema: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodNumber>>;
export declare const upsertRecordSchema: z.ZodObject<{
    studentId: z.ZodString;
    session: z.ZodString;
    class: z.ZodNumber;
    scope: z.ZodEnum<["terminal", "annual"]>;
    terminalKey: z.ZodOptional<z.ZodString>;
    marks: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    session: string;
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: Record<string, Record<string, number>>;
    terminalKey?: string | undefined;
}, {
    session: string;
    studentId: string;
    class: number;
    scope: "terminal" | "annual";
    marks: Record<string, Record<string, number>>;
    terminalKey?: string | undefined;
}>;
export declare const changeStatusSchema: z.ZodObject<{
    action: z.ZodEnum<["submit", "unlock", "publish"]>;
}, "strip", z.ZodTypeAny, {
    action: "submit" | "unlock" | "publish";
}, {
    action: "submit" | "unlock" | "publish";
}>;
