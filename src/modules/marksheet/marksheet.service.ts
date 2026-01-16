import { ResultSnapshot } from "../result-snapshot/resultSnapshot.model";
import { renderMarksheetHTML } from "./templates/marksheet.html";
import { MarksheetQuery } from "./marksheet.types";
import QRCode from "qrcode";
import puppeteer from "puppeteer";

const schoolProfile = {
  nameEn: process.env.SCHOOL_NAME_EN || "School Name",
  nameBn: process.env.SCHOOL_NAME_BN,
  address: process.env.SCHOOL_ADDRESS,
  logoUrl: process.env.SCHOOL_LOGO_URL,
};

export const MarksheetService = {
  async generatePDF(query: MarksheetQuery) {
    const q: any = {
      studentId: query.studentId,
      session: query.session,
      class: query.class,
      scope: query.scope,
    };
    if (query.scope === "terminal") q.terminalKey = query.terminalKey;

    const snap = await ResultSnapshot.findOne(q).lean();
    if (!snap) throw new Error("Result snapshot not found");

    // QR payload (safe, non-sensitive)
    const qrPayload = {
      studentId: snap.studentId,
      session: snap.session,
      class: snap.class,
      scope: snap.scope,
      terminalKey: snap.terminalKey,
    };

    const qrBase64 = await QRCode.toDataURL(JSON.stringify(qrPayload));

    const html = renderMarksheetHTML({
      school: schoolProfile,
      student: { studentId: snap.studentId },
      meta: {
        scope: snap.scope,
        terminalLabel: snap.terminalKey,
        session: snap.session,
        class: snap.class,
        position: snap.position,
      },
      subjects: snap.subjects.map((s: any) => ({
        subjectId: s.subjectId,
        normalized: Object.fromEntries(s.normalized),
        final: s.final,
        failed: !!s.failed,
      })),
      summary: {
        total: snap.total,
        percentage: snap.percentage,
        failed: !!snap.failed,
      },
      qrBase64,
    });

    // Puppeteer PDF
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

    await browser.close();
    return pdf;
  },
};
