import { Student } from "./student.model";
import { BadRequestError, NotFoundError } from "../../core/errors/";

export const StudentService = {
  async create(payload: any) {
    return Student.create(payload);
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
    return Student.findOneAndUpdate({ studentUid }, update, {
      new: true,
    }).lean();
  },

  async promote(studentUid: string, entry: any) {
    return Student.findOneAndUpdate(
      { studentUid },
      {
        $push: { promotions: entry },
        $set: {
          status: entry.result === "repeat" ? "repeat" : "active",
          "current.class": entry.toClass,
          "current.roll": entry.newRoll,
        },
      },
      { new: true }
    ).lean();
  },

   async updateStipendBeneficiary(studentUid: string, payload: any) {
    const student = await Student.findOne({ studentUid });
    if (!student) throw new NotFoundError("Student not found");

    if (!payload.name || !payload.mobile) {
      throw new BadRequestError("Name and mobile are required");
    }

    student.stipendBeneficiary = {
      name: payload.name,
      mobile: payload.mobile,
      relation: payload.relation ?? "guardian",
      paymentMethod: payload.paymentMethod ?? "mobile_banking",
      walletProvider: payload.walletProvider,
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

