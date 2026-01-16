export type LocalizedString = Record<string, string>; // { en, bn, ar, cc }

export type StudentStatus =
  | "active"
  | "repeat"
  | "passed"
  | "transferred"
  | "archived";

export interface Guardian {
  relation: "father" | "mother" | "guardian";
  name: LocalizedString;
  mobile?: string;
  nid?: string;
  birthRegistration?: string;
}

export interface PromotionEntry {
  session: string;
  fromClass: number;
  toClass: number;
  result: "promoted" | "repeat";
  previousRoll?: number;
  newRoll?: number;
  decidedAt: Date;
}
