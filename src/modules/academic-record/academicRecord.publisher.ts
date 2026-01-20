// src/modules/academic-record/academicRecord.publisher.ts - FIXED VERSION
import mongoose from "mongoose";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../core/errors/httpErrors";
import { AcademicRecord } from "./academicRecord.model";
import { ResultSnapshot } from "../result-snapshot/resultSnapshot.model";
import { ResultConfig } from "../result-config/resultConfig.model";
import { calculateResults } from "../result-engine/resultEngine";
import { convertForCalculation } from "../../utils/typesafe-wrapper";

export async function publishAndGenerateResult(
  query: any,
  actor: { userId: string; role: string }
) {
  // ✅ AUTHORIZATION
  if (actor.role !== "SCHOOL_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ForbiddenError("Only admin can publish result");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const record = await AcademicRecord.findOne(query).session(session);
    if (!record) {
      throw new NotFoundError("Academic record not found");
    }

    if (record.status !== "SUBMITTED") {
      throw new ConflictError("Only submitted record can be published");
    }

    const config = await ResultConfig.findOne({
      session: record.session,
      class: record.class,
      isActive: true,
    }).session(session);

    if (!config) {
      throw new NotFoundError("Active result config not found");
    }

    // FIX: Use the new converter function
    const configForCalculation = convertForCalculation(config);

    // ✅ FIX 1: Type-safe terminalKeyPrefix
    const engineOptions: any = {
      scope: record.scope,
    };

    // Only add terminalKeyPrefix if it exists and scope is terminal
    if (record.scope === "terminal" && record.terminalKey) {
      engineOptions.terminalKeyPrefix = String(record.terminalKey);
    }

    const [result] = calculateResults(
      [
        {
          studentId: record.studentId,
          session: record.session,
          class: record.class,
          marks: record.marks,
        },
      ],
      configForCalculation,
      engineOptions // ✅ Use the type-safe options
    );

    try {
      await ResultSnapshot.create(
        [
          {
            studentId: result.studentId,
            session: record.session,
            class: record.class,
            scope: record.scope,
            terminalKey: record.terminalKey,
            academicRecordId: record._id,
            resultConfigId: config._id,
            subjects: Object.entries(result.subjects).map(([subjectId, s]) => ({
              subjectId,
              normalized: s.normalized,
              final: s.final,
              failed: s.failed,
            })),
            total: result.total,
            percentage: result.percentage,
            failed: result.failed,
          },
        ],
        { session }
      );
    } catch (e: any) {
      // ✅ IDEMPOTENCY
      if (e.code === 11000) {
        throw new ConflictError("Result already published");
      }
      throw e;
    }

    record.status = "PUBLISHED";
    record.publishedAt = new Date();
    await record.save({ session });

    await session.commitTransaction();
    return { success: true };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
