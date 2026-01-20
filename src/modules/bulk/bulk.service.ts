import archiver from "archiver";
import { Student } from "../student/student.model";
import { IDCardService } from "../id-card/idCard.service";
import { safeArchiveAppend } from "../../utils/typesafe-wrapper";

export const BulkService = {
  async generateClassIdCardsZip(
    params: { class: number; session: string },
    res: any
  ) {
    const students = await Student.find({
      "current.class": params.class,
      "current.session": params.session,
      status: { $ne: "archived" },
    }).lean();

    if (!students.length) {
      throw new Error("No students found");
    }

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    for (const student of students) {
      const { frontPdf, backPdf } = await IDCardService.generatePDF({
        studentUid: student.studentUid,
      });

       safeArchiveAppend(archive, frontPdf, {
         name: `${student.studentUid}-front.pdf`,
       });

       safeArchiveAppend(archive, backPdf, {
         name: `${student.studentUid}-back.pdf`,
       });

      // archive.append(frontPdf, {
      //   name: `${student.studentUid}-front.pdf`,
      // });

      // archive.append(backPdf, {
      //   name: `${student.studentUid}-back.pdf`,
      // });
    }

    await archive.finalize();
  },
};
