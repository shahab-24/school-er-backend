export interface MarksheetQuery {
    scope: "terminal" | "annual";
    terminalKey?: string;
    session: string;
    class: number;
    studentId: string;
}
export interface MarksheetData {
    school: {
        nameEn: string;
        nameBn?: string;
        logoUrl?: string;
        address?: string;
    };
    student: {
        studentId: string;
        nameEn?: string;
        nameBn?: string;
        imageUrl?: string;
    };
    meta: {
        scope: "terminal" | "annual";
        terminalLabel?: string;
        session: string;
        class: number;
        position?: number;
    };
    subjects: Array<{
        subjectId: string;
        subjectName?: string;
        normalized: Record<string, number>;
        final: number;
        failed: boolean;
    }>;
    summary: {
        total: number;
        percentage: number;
        failed: boolean;
    };
    qrPayload?: Record<string, any>;
}
