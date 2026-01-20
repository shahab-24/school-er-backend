import { SignOptions, Secret } from "jsonwebtoken";
export declare function signJwt(payload: object, secret: Secret, options: SignOptions): string;
