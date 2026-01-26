export type LocalizedString = Record<string, string>; // { en, bn, ar, cc }

export type StudentStatus =
  | "active"
  | "repeat"
  | "passed"
  | "transferred"
  | "archived";



export interface PromotionEntry {
  session: string;
  fromClass: number;
  toClass: number;
  result: "promoted" | "repeat";
  previousRoll?: number;
  newRoll?: number;
  decidedAt: Date;
}

export interface Parent {
  name: LocalizedString;
  mobile: string;
  nid: string;
  birthRegistration: string;
}

export interface Guardian {
  relation: "guardian" | "other";
  name: LocalizedString;
  mobile: string;
  nid?: string;
  walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
}

export interface StipendBeneficiary {
  name: string;
  mobile: string;
  relation: "father" | "mother" | "guardian" | "other";
  paymentMethod: "mobile_banking" | "bank" | "cash";
  walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
  isActive: boolean;
  updatedAt: Date;
}
