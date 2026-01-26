import { Student } from "./student.model";
import { BadRequestError, NotFoundError } from "../../core/errors";

export const StudentService = {
  async create(payload: any) {
    const exists = await Student.findOne({
      studentUid: payload.studentUid,
    });

    if (exists) {
      throw new BadRequestError("Student UID already exists");
    }

    return Student.create({
      ...payload,
      birthDate: new Date(payload.birthDate),
    });
  },

  async list(query: any) {
    return Student.find(query).lean();
  },

  async getByUid(studentUid: string) {
    return Student.findOne({ studentUid }).lean();
  },

  async updateStatus(studentUid: string, status: string) {
    const update: any = { status };
    if (status === "archived") update.archivedAt = new Date();

    const student = await Student.findOneAndUpdate({ studentUid }, update, {
      new: true,
    }).lean();

    if (!student) throw new NotFoundError("Student not found");

    return student;
  },

  async promote(studentUid: string, entry: any) {
    const student = await Student.findOneAndUpdate(
      { studentUid },
      {
        $push: { promotions: entry },
        $set: {
          status: entry.result === "repeat" ? "repeat" : "active",
          "current.class": entry.toClass,
          "current.roll": entry.newRoll,
          "current.session": entry.session,
        },
      },
      { new: true }
    ).lean();

    if (!student) throw new NotFoundError("Student not found");

    return student;
  },

  async updateStipendBeneficiary(studentUid: string, payload: any) {
    const student = await Student.findOne({ studentUid });
    if (!student) throw new NotFoundError("Student not found");

    student.stipendBeneficiary = {
      ...payload,
      isActive: true,
      updatedAt: new Date(),
    };

    await student.save();
    return student;
  },

  async getStipendBeneficiary(studentUid: string) {
    const student = await Student.findOne(
      { studentUid },
      { stipendBeneficiary: 1 }
    ).lean();

    if (!student) throw new NotFoundError("Student not found");

    return student.stipendBeneficiary;
  },
};
