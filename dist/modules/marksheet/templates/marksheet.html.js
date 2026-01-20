"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMarksheetHTML = renderMarksheetHTML;
function renderMarksheetHTML(data) {
    const rows = data.subjects
        .map((s) => `
      <tr>
        <td>${s.subjectName ?? s.subjectId}</td>
        <td>${Object.entries(s.normalized)
        .map(([k, v]) => `${k}: ${v.toFixed(2)}`)
        .join("<br/>")}</td>
        <td>${s.final.toFixed(2)}</td>
        <td>${s.failed ? "Fail" : "Pass"}</td>
      </tr>`)
        .join("");
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marksheet</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .header { display:flex; align-items:center; gap:16px; }
    .logo { height:60px; }
    table { width:100%; border-collapse:collapse; margin-top:16px; }
    th, td { border:1px solid #333; padding:8px; }
    .footer { margin-top:24px; display:flex; justify-content:space-between; }
    .qr { margin-top:16px; text-align:right; }
    .qr img { height:90px; }
  </style>
</head>
<body>
  <div class="header">
    ${data.school.logoUrl
        ? `<img class="logo" src="${data.school.logoUrl}"/>`
        : ""}
    <div>
      <h2>${data.school.nameEn}</h2>
      ${data.school.nameBn ? `<div>${data.school.nameBn}</div>` : ""}
      ${data.school.address ? `<div>${data.school.address}</div>` : ""}
    </div>
  </div>

  <hr/>

  <h3>
    ${data.meta.scope === "terminal" ? "Terminal" : "Annual"} Marksheet
    ${data.meta.terminalLabel ? `(${data.meta.terminalLabel})` : ""}
  </h3>

  <div>
    <strong>Student ID:</strong> ${data.student.studentId}<br/>
    ${data.student.nameEn
        ? `<strong>Name (EN):</strong> ${data.student.nameEn}<br/>`
        : ""}
    ${data.student.nameBn
        ? `<strong>Name (BN):</strong> ${data.student.nameBn}<br/>`
        : ""}
    <strong>Class:</strong> ${data.meta.class} |
    <strong>Session:</strong> ${data.meta.session}
  </div>

  <table>
    <thead>
      <tr>
        <th>Subject</th>
        <th>Breakdown</th>
        <th>Final</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="summary">
    <strong>Total:</strong> ${data.summary.total.toFixed(2)}<br/>
    <strong>Percentage:</strong> ${data.summary.percentage.toFixed(2)}%<br/>
    <strong>Status:</strong> ${data.summary.failed ? "Fail" : "Pass"}<br/>
    ${data.meta.position
        ? `<strong>Position:</strong> ${data.meta.position}`
        : ""}
  </div>

  <div class="footer">
    <div>Class Teacher</div>
    <div>Head Teacher</div>
  </div>

  ${data.qrBase64
        ? `
    <div class="qr">
      <img src="${data.qrBase64}" />
      <div style="font-size:12px;">Scan to verify</div>
    </div>
  `
        : ""}

</body>
</html>`;
}
//# sourceMappingURL=marksheet.html.js.map