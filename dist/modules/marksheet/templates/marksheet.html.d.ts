import { MarksheetData } from "../marksheet.types";
type MarksheetTemplateData = MarksheetData & {
    qrBase64?: string;
};
export declare function renderMarksheetHTML(data: MarksheetTemplateData): string;
export {};
