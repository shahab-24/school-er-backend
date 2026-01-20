import { z } from "zod";
export declare const createStudentSchema: z.ZodObject<{
    studentUid: z.ZodString;
    name: z.ZodRecord<z.ZodString, z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female", "other"]>>;
    religion: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodString>;
    birthRegistration: z.ZodOptional<z.ZodString>;
    languagePreference: z.ZodOptional<z.ZodString>;
    guardians: z.ZodOptional<z.ZodArray<z.ZodObject<{
        relation: z.ZodEnum<["father", "mother", "guardian"]>;
        name: z.ZodRecord<z.ZodString, z.ZodString>;
        mobile: z.ZodOptional<z.ZodString>;
        nid: z.ZodOptional<z.ZodString>;
        birthRegistration: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: Record<string, string>;
        relation: "father" | "mother" | "guardian";
        mobile?: string | undefined;
        nid?: string | undefined;
        birthRegistration?: string | undefined;
    }, {
        name: Record<string, string>;
        relation: "father" | "mother" | "guardian";
        mobile?: string | undefined;
        nid?: string | undefined;
        birthRegistration?: string | undefined;
    }>, "many">>;
    imageUrl: z.ZodOptional<z.ZodString>;
    current: z.ZodObject<{
        session: z.ZodString;
        class: z.ZodNumber;
        roll: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        session: string;
        class: number;
        roll?: number | undefined;
    }, {
        session: string;
        class: number;
        roll?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: Record<string, string>;
    studentUid: string;
    current: {
        session: string;
        class: number;
        roll?: number | undefined;
    };
    birthRegistration?: string | undefined;
    gender?: "other" | "male" | "female" | undefined;
    religion?: string | undefined;
    birthDate?: string | undefined;
    languagePreference?: string | undefined;
    guardians?: {
        name: Record<string, string>;
        relation: "father" | "mother" | "guardian";
        mobile?: string | undefined;
        nid?: string | undefined;
        birthRegistration?: string | undefined;
    }[] | undefined;
    imageUrl?: string | undefined;
}, {
    name: Record<string, string>;
    studentUid: string;
    current: {
        session: string;
        class: number;
        roll?: number | undefined;
    };
    birthRegistration?: string | undefined;
    gender?: "other" | "male" | "female" | undefined;
    religion?: string | undefined;
    birthDate?: string | undefined;
    languagePreference?: string | undefined;
    guardians?: {
        name: Record<string, string>;
        relation: "father" | "mother" | "guardian";
        mobile?: string | undefined;
        nid?: string | undefined;
        birthRegistration?: string | undefined;
    }[] | undefined;
    imageUrl?: string | undefined;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["active", "repeat", "passed", "transferred", "archived"]>;
}, "strip", z.ZodTypeAny, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
}>;
export declare const promoteSchema: z.ZodObject<{
    session: z.ZodString;
    fromClass: z.ZodNumber;
    toClass: z.ZodNumber;
    result: z.ZodEnum<["promoted", "repeat"]>;
    previousRoll: z.ZodOptional<z.ZodNumber>;
    newRoll: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
}, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
}>;
