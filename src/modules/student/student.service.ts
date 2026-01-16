import { Student } from "./student.model";

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
};
