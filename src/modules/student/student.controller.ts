import { Request, Response } from "express";
import { StudentService } from "./student.service";
import {
  createStudentSchema,
  updateStatusSchema,
  promoteSchema,
  stipendBeneficiarySchema,
} from "./student.validation";

export const StudentController = {
  async create(req: Request, res: Response) {
    const data = createStudentSchema.parse(req.body);

    const student = await StudentService.create(data);

    res.status(201).json({
      success: true,
      data: student,
    });
  },

  async list(req: Request, res: Response) {
    const docs = await StudentService.list(req.query);
    res.json({ success: true, data: docs });
  },

  async get(req: Request, res: Response) {
    const doc = await StudentService.getByUid(req.params.studentUid);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data: doc });
  },

  async updateStatus(req: Request, res: Response) {
    const { status } = updateStatusSchema.parse(req.body);
    const doc = await StudentService.updateStatus(
      req.params.studentUid,
      status
    );
    res.json({ success: true, data: doc });
  },

  async promote(req: Request, res: Response) {
    const entry = promoteSchema.parse(req.body);
    const doc = await StudentService.promote(req.params.studentUid, entry);
    res.json({ success: true, data: doc });
  },

  async updateStipendBeneficiary(req: Request, res: Response) {
    const data = stipendBeneficiarySchema.parse(req.body);

    const student = await StudentService.updateStipendBeneficiary(
      req.params.studentUid,
      data
    );

    res.json({
      success: true,
      message: "Stipend beneficiary updated successfully",
      data: student.stipendBeneficiary,
    });
  },

  async getStipendBeneficiary(req: Request, res: Response) {
    const beneficiary = await StudentService.getStipendBeneficiary(
      req.params.studentUid
    );

    res.json({ success: true, data: beneficiary });
  },
};
