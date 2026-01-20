import { SheetQuery, ClassResultSheet } from "./resultSheet.types";
export declare const ResultSheetService: {
    generate(query: SheetQuery): Promise<ClassResultSheet>;
    /**
     * Annual sheet with previous terminal comparison (optional).
     * Provide previous scope/key to enrich rows.
     */
    generateWithPrevious(current: SheetQuery, previous: SheetQuery): Promise<ClassResultSheet>;
};
