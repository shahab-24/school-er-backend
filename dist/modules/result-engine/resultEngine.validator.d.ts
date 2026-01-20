import { ResultConfigDTO, AcademicRecordDTO } from "./resultEngine.types";
export declare function validateConfig(cfg: ResultConfigDTO): void;
export declare function validateRecordAgainstConfig(record: AcademicRecordDTO, cfg: ResultConfigDTO): void;
