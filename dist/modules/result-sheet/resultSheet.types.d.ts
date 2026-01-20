export interface SheetQuery {
    scope: "terminal" | "annual";
    terminalKey?: string;
    session: string;
    class: number;
}
export interface SheetRow {
    studentId: string;
    roll?: number;
    total: number;
    percentage: number;
    position: number;
    failed: boolean;
    previous?: {
        class?: number;
        roll?: number;
        position?: number;
    };
}
export interface ClassResultSheet {
    session: string;
    class: number;
    scope: "terminal" | "annual";
    terminalKey?: string;
    rows: SheetRow[];
}
