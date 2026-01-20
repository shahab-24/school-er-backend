export declare function safeJwtSign(payload: any, secret: string, options?: any): string;
export declare function safeArchiveAppend(archive: any, data: any, options: any): void;
export declare function convertMapToRecord<T>(map: Map<string, T> | Record<string, T> | null | undefined): Record<string, T> | undefined;
export declare function convertForCalculation(config: any): any;
export declare function safeString(value: any): string | undefined;
export declare function safeNumber(value: any): number | undefined;
