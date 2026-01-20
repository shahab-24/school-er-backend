import jwt, { SignOptions, Secret } from "jsonwebtoken";

export function signJwt(
  payload: object,
  secret: Secret,
  options: SignOptions
): string {
  return jwt.sign(payload, secret, options);
}
