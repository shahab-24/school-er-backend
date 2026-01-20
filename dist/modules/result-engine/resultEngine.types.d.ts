export type AggregationType = "sum" | "average" | "weighted";
export interface ExamDef {
    key: string;
    label: string;
    totalMarks: number;
    required?: boolean;
}
export interface NormalizationRule {
    examKey: string;
    from: number;
    to: number;
}
export interface AggregationRule {
    type: AggregationType;
    examKeys?: string[];
    weights?: Record<string, number>;
}
export interface ResultConfigDTO {
    exams: ExamDef[];
    normalization: NormalizationRule[];
    aggregation: AggregationRule;
    passRules?: {
        passPercentage?: number;
        failIfAnySubjectFail?: boolean;
    };
}
export interface AcademicRecordDTO {
    studentId: string;
    session: string;
    class: number;
    marks: Record<string, Record<string, number>>;
}
export interface SubjectDef {
    subjectId: string;
    isOptional?: boolean;
}
export interface EngineOptions {
    scope: "terminal" | "annual";
    terminalKeyPrefix?: string;
}
export interface SubjectResult {
    normalized: Record<string, number>;
    final: number;
    failed: boolean;
}
export interface StudentResult {
    studentId: string;
    subjects: Record<string, SubjectResult>;
    total: number;
    percentage: number;
    failed: boolean;
}
