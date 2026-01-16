import { ValidationError } from "./resultEngine.errors";
import { ResultConfigDTO, AcademicRecordDTO } from "./resultEngine.types";

export function validateConfig(cfg: ResultConfigDTO) {
  const examKeys = new Set(cfg.exams.map((e) => e.key));

  // normalization examKey must exist
  for (const n of cfg.normalization) {
    if (!examKeys.has(n.examKey)) {
      throw new ValidationError(
        `Normalization examKey not found: ${n.examKey}`
      );
    }
    if (n.from <= 0 || n.to <= 0) {
      throw new ValidationError(`Invalid normalization scale for ${n.examKey}`);
    }
  }

  // aggregation rules sanity
  if (cfg.aggregation.type === "average" && !cfg.aggregation.examKeys?.length) {
    throw new ValidationError("Average aggregation requires examKeys");
  }
  if (cfg.aggregation.type === "weighted") {
    if (
      !cfg.aggregation.weights ||
      Object.keys(cfg.aggregation.weights).length === 0
    ) {
      throw new ValidationError("Weighted aggregation requires weights");
    }
  }
}

export function validateRecordAgainstConfig(
  record: AcademicRecordDTO,
  cfg: ResultConfigDTO
) {
  const examDefs = new Map(cfg.exams.map((e) => [e.key, e]));
  for (const [subjectId, exams] of Object.entries(record.marks)) {
    for (const [examKey, obtained] of Object.entries(exams)) {
      const def = examDefs.get(examKey);
      if (!def) {
        throw new ValidationError(
          `Unknown examKey '${examKey}' for subject ${subjectId}`
        );
      }
      if (obtained < 0 || obtained > def.totalMarks) {
        throw new ValidationError(
          `Invalid marks ${obtained}/${def.totalMarks} for ${examKey} (${subjectId})`
        );
      }
    }
    // required exams present?
    for (const def of cfg.exams) {
      if (def.required && exams[def.key] == null) {
        throw new ValidationError(
          `Missing required exam '${def.key}' for subject ${subjectId}`
        );
      }
    }
  }
}
