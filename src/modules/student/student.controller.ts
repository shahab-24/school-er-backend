import { Request, Response } from "express";
import { StudentService } from "./student.service";
import {
  createStudentSchema,
  updateStatusSchema,
  promoteSchema,
} from "./student.validation";

export const StudentController = {
  async create(req: Request, res: Response) {
    const data = createStudentSchema.parse(req.body);
    const doc = await StudentService.create(data);
    res.status(201).json(doc);
  },

  async list(req: Request, res: Response) {
    const docs = await StudentService.list(req.query);
    res.json(docs);
  },

  async get(req: Request, res: Response) {
    const doc = await StudentService.getByUid(req.params.studentUid);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  },

  async updateStatus(req: Request, res: Response) {
    const { status } = updateStatusSchema.parse(req.body);
    const doc = await StudentService.updateStatus(
      req.params.studentUid,
      status
    );
    res.json(doc);
  },

  async promote(req: Request, res: Response) {
    const entry = promoteSchema.parse(req.body);
    const doc = await StudentService.promote(req.params.studentUid, entry);
    res.json(doc);
  },
  async updateStipendBeneficiary(req: Request, res: Response) {
    const { studentUid } = req.params;
    const data = req.body;

    const student = await StudentService.updateStipendBeneficiary(
      studentUid,
      data
    );

    res.json({
      success: true,
      message: "Stipend beneficiary updated successfully",
      data: student.stipendBeneficiary,
    });
  },

  async getStipendBeneficiary(req: Request, res: Response) {
    const { studentUid } = req.params;

    const beneficiary = await StudentService.getStipendBeneficiary(studentUid);

    res.json({
      success: true,
      data: beneficiary,
    });
  },
};
