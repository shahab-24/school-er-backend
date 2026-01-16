export type AggregationType = "sum" | "average" | "weighted";

export interface ExamDef {
  key: string; // dynamic exam key (e.g. first_terminal_written)
  label: string;
  totalMarks: number;
  required?: boolean;
}

export interface NormalizationRule {
  examKey: string;
  from: number; // source scale
  to: number; // target scale
}

export interface AggregationRule {
  type: AggregationType;
  examKeys?: string[]; // for average
  weights?: Record<string, number>; // for weighted
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
  // subjectId -> examKey -> obtained
  marks: Record<string, Record<string, number>>;
}

export interface SubjectDef {
  subjectId: string;
  isOptional?: boolean;
}

export interface EngineOptions {
  scope: "terminal" | "annual";
  terminalKeyPrefix?: string; // e.g. "first_terminal"
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
