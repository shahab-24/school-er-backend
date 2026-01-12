import { Student } from "./student.model";

const generateStudentId = async () => {
  const count = await Student.countDocuments();
  return `STD-${(count + 1).toString().padStart(6, "0")}`;
};

export const StudentService = {
  async create(payload: any) {
    const studentId = await generateStudentId();
    return Student.create({ ...payload, studentId });
  },

  async list(query: any) {
    const { search } = query;
    if (search) {
      return Student.find({ $text: { $search: search } }).lean();
    }
    return Student.find().lean();
  },

  async getById(id: string) {
    return Student.findById(id).lean();
  },
};
