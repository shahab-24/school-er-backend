import { Types } from "mongoose";

// 1. Fix JWT secret type
export function safeJwtSign(
  payload: any,
  secret: string,
  options?: any
): string {
  const jwt = require("jsonwebtoken");
  return jwt.sign(payload, secret, options);
}

// 2. Fix archiver Buffer issue
export function safeArchiveAppend(archive: any, data: any, options: any): void {
  if (data instanceof Uint8Array) {
    const buffer = Buffer.from(data);
    archive.append(buffer, options);
  } else {
    archive.append(data, options);
  }
}

// 3. Fix Map to Record - IMPORTANT: Return Map | Record based on input
export function convertMapToRecord<T>(
  map: Map<string, T> | Record<string, T> | null | undefined
): Record<string, T> | undefined {
  if (!map) return undefined;

  if (map instanceof Map) {
    const record: Record<string, T> = {};
    for (const [key, value] of map.entries()) {
      record[key] = value;
    }
    return record;
  }

  return map;
}

// 4. Type-safe conversion that preserves Map if needed
export function convertForCalculation(config: any): any {
  const plain = config.toObject ? config.toObject() : config;

  if (plain.aggregation?.weights instanceof Map) {
    const weights: Record<string, number> = {};
    for (const [key, value] of plain.aggregation.weights.entries()) {
      weights[key] = value;
    }
    plain.aggregation.weights = weights;
  }

  return plain;
}

// 5. Safe string/number
export function safeString(value: any): string | undefined {
  if (value === null || value === undefined) return undefined;
  const str = String(value);
  return str.trim() || undefined;
}

export function safeNumber(value: any): number | undefined {
  if (value === null || value === undefined) return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}
