import { Schema, Types } from "mongoose";
export declare const Student: import("mongoose").Model<{
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    languagePreference: string;
    guardians: Types.DocumentArray<{
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }> & {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }>;
    promotions: Types.DocumentArray<{
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    birthRegistration?: string | null | undefined;
    gender?: "other" | "male" | "female" | null | undefined;
    religion?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session?: string | null | undefined;
        class?: number | null | undefined;
        roll?: number | null | undefined;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    languagePreference: string;
    guardians: Types.DocumentArray<{
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }> & {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }>;
    promotions: Types.DocumentArray<{
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    birthRegistration?: string | null | undefined;
    gender?: "other" | "male" | "female" | null | undefined;
    religion?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session?: string | null | undefined;
        class?: number | null | undefined;
        roll?: number | null | undefined;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    languagePreference: string;
    guardians: Types.DocumentArray<{
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }> & {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }>;
    promotions: Types.DocumentArray<{
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    birthRegistration?: string | null | undefined;
    gender?: "other" | "male" | "female" | null | undefined;
    religion?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session?: string | null | undefined;
        class?: number | null | undefined;
        roll?: number | null | undefined;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    languagePreference: string;
    guardians: Types.DocumentArray<{
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }> & {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }>;
    promotions: Types.DocumentArray<{
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    birthRegistration?: string | null | undefined;
    gender?: "other" | "male" | "female" | null | undefined;
    religion?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session?: string | null | undefined;
        class?: number | null | undefined;
        roll?: number | null | undefined;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    languagePreference: string;
    guardians: Types.DocumentArray<{
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }> & {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }>;
    promotions: Types.DocumentArray<{
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    birthRegistration?: string | null | undefined;
    gender?: "other" | "male" | "female" | null | undefined;
    religion?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session?: string | null | undefined;
        class?: number | null | undefined;
        roll?: number | null | undefined;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    languagePreference: string;
    guardians: Types.DocumentArray<{
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }> & {
        name: {};
        relation: "father" | "mother" | "guardian";
        mobile?: string | null | undefined;
        nid?: string | null | undefined;
        birthRegistration?: string | null | undefined;
    }>;
    promotions: Types.DocumentArray<{
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        result: "repeat" | "promoted";
        fromClass: number;
        toClass: number;
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    birthRegistration?: string | null | undefined;
    gender?: "other" | "male" | "female" | null | undefined;
    religion?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session?: string | null | undefined;
        class?: number | null | undefined;
        roll?: number | null | undefined;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
