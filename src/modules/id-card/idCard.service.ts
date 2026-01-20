import QRCode from "qrcode";
import puppeteer from "puppeteer";
import { Student } from "../student/student.model";
import { renderIDCardFront } from "./templates/idCard.front.html";
import { renderIDCardBack } from "./templates/idCard.back.html";
import { IDCardQuery } from "./idCard.types";

const schoolProfile = {
  name: { en: process.env.SCHOOL_NAME_EN ?? "School" },
  logoUrl: process.env.SCHOOL_LOGO_URL,
  address: process.env.SCHOOL_ADDRESS,
  contact: process.env.SCHOOL_PHONE,
};



export const IDCardService = {

  async generatePDF(query: IDCardQuery) {
    
    const student = await Student.findOne({
      studentUid: query.studentUid,
      
    }).lean();
    
    if (!student) throw new Error("Student not found");

    const qrPayload = {
      studentUid: student.studentUid,
      type: "ID_CARD",
      imageUrl: student.imageUrl || undefined,
    };

    if (!student.current) {
      throw new Error("Student academic info missing");
    }

    
    if (student.current.class === null || student.current.class === undefined) {
      throw new Error("Student class is missing");
    }
    if (student.current.roll === null || student.current.roll === undefined) {
      throw new Error("Student roll is missing");
    }
    if (student.current.roll === null || student.current.roll === undefined) {
      throw new Error("Student roll is missing");
    }
   
const guardianMobile =
  typeof student.guardians?.[0]?.mobile === "string"
    ? student.guardians[0].mobile
    : undefined;

const normalizedImageUrl =
  typeof student.imageUrl === "string" ? student.imageUrl : undefined;

    const qrBase64 = await QRCode.toDataURL(JSON.stringify(qrPayload));

    const data = {
      school: schoolProfile,
      student: {
        studentUid: student.studentUid,
        name: student.name,
        imageUrl: normalizedImageUrl,
        class: student.current.class,
        roll: student.current.roll,
        guardianMobile,
      },
      meta: {
        issueDate: new Date().toISOString().slice(0, 10),
      },
      qrBase64,
    };

   const browser = await puppeteer.launch({
     headless: true,
     args: ["--no-sandbox", "--disable-setuid-sandbox"],
   });

    const page = await browser.newPage();

    // FRONT
    await page.setContent(renderIDCardFront(data));
    const frontPdf = await page.pdf({ width: "320px", height: "200px" });

    // BACK
    await page.setContent(renderIDCardBack(data));
    const backPdf = await page.pdf({ width: "320px", height: "200px" });

    await browser.close();

    return { frontPdf, backPdf };
  },
};
