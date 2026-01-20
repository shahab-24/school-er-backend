import { MarksheetQuery } from "./marksheet.types";
export declare const MarksheetService: {
    generatePDF(query: MarksheetQuery): Promise<Uint8Array<ArrayBufferLike>>;
};
