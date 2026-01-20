import mongoose from "mongoose";
export declare const schoolConfig: {
    nameEn: string;
    nameBn: string;
    established: number;
    phone: string;
    address: string;
    email: string;
    logoUrl: string;
};
export declare const connectDB: (options?: mongoose.ConnectOptions) => Promise<void>;
export declare const validateEnvironment: () => boolean;
declare const _default: {
    schoolConfig: {
        nameEn: string;
        nameBn: string;
        established: number;
        phone: string;
        address: string;
        email: string;
        logoUrl: string;
    };
    connectDB: (options?: mongoose.ConnectOptions) => Promise<void>;
    validateEnvironment: () => boolean;
};
export default _default;
