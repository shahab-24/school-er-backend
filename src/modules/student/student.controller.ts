import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { createStudentSchema } from "./student.validation";

export const StudentController = {
  async create(req: Request, res: Response) {
    const parsed = createStudentSchema.parse(req.body);
    const student = await StudentService.create(parsed);
    res.status(201).json(student);
  },

  async list(req: Request, res: Response) {
    const students = await StudentService.list(req.query);
    res.json(students);
  },

  async get(req: Request, res: Response) {
    const student = await StudentService.getById(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  },
};
