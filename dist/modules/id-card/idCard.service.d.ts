import { IDCardQuery } from "./idCard.types";
export declare const IDCardService: {
    generatePDF(query: IDCardQuery): Promise<{
        frontPdf: Uint8Array<ArrayBufferLike>;
        backPdf: Uint8Array<ArrayBufferLike>;
    }>;
};
