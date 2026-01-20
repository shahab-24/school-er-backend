export type Role = "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
export interface JwtPayload {
    userId: string;
    role: Role;
    schoolId?: string;
}
