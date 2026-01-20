export declare const StudentService: {
    create(payload: any): Promise<import("mongoose").Document<unknown, {}, {
        status: "repeat" | "active" | "passed" | "transferred" | "archived";
        name: {};
        studentUid: string;
        languagePreference: string;
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    list(query: any): Promise<(import("mongoose").FlattenMaps<{
        status: "repeat" | "active" | "passed" | "transferred" | "archived";
        name: {};
        studentUid: string;
        languagePreference: string;
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getByUid(studentUid: string): Promise<(import("mongoose").FlattenMaps<{
        status: "repeat" | "active" | "passed" | "transferred" | "archived";
        name: {};
        studentUid: string;
        languagePreference: string;
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateStatus(studentUid: string, status: string): Promise<(import("mongoose").FlattenMaps<{
        status: "repeat" | "active" | "passed" | "transferred" | "archived";
        name: {};
        studentUid: string;
        languagePreference: string;
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    promote(studentUid: string, entry: any): Promise<(import("mongoose").FlattenMaps<{
        status: "repeat" | "active" | "passed" | "transferred" | "archived";
        name: {};
        studentUid: string;
        languagePreference: string;
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateStipendBeneficiary(studentUid: string, payload: any): Promise<import("mongoose").Document<unknown, {}, {
        status: "repeat" | "active" | "passed" | "transferred" | "archived";
        name: {};
        studentUid: string;
        languagePreference: string;
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        guardians: import("mongoose").Types.DocumentArray<{
            name: {};
            relation: "father" | "mother" | "guardian";
            mobile?: string | null | undefined;
            nid?: string | null | undefined;
            birthRegistration?: string | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        promotions: import("mongoose").Types.DocumentArray<{
            session: string;
            result: "repeat" | "promoted";
            fromClass: number;
            toClass: number;
            decidedAt: NativeDate;
            previousRoll?: number | null | undefined;
            newRoll?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getStipendBeneficiary(studentUid: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        relation: "father" | "mother" | "guardian" | "other";
        mobile: string;
        paymentMethod: "mobile_banking" | "bank" | "cash";
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | null | undefined;
    }> | null | undefined>;
};
