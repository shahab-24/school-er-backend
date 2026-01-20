export type RecordStatus = "DRAFT" | "SUBMITTED" | "PUBLISHED";
export interface AcademicRecordInput {
    studentId: string;
    session: string;
    class: number;
    scope: "terminal" | "annual";
    terminalKey?: string;
    marks: Record<string, Record<string, number>>;
}
