export interface IDCardQuery {
    studentUid: string;
}
export interface IDCardData {
    school: {
        name: Record<string, string>;
        logoUrl?: string;
        address?: string;
        contact?: string;
    };
    student: {
        studentUid: string;
        name: Record<string, string>;
        imageUrl?: string;
        class: number;
        roll?: number;
        guardianMobile?: string;
    };
    meta: {
        issueDate: string;
        expiryDate?: string;
    };
    qrBase64: string;
}
