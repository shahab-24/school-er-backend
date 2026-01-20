export declare const AuthService: {
    login(email: string, password: string): Promise<{
        success: boolean;
        token: string;
        role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string | null | undefined;
            role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
        };
    }>;
};
