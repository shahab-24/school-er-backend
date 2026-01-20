import { IDCardData } from "../idCard.types";

export function renderIDCardBack(data: IDCardData) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: Arial, sans-serif; width: 320px; height: 200px; }
    .card { border:1px solid #333; padding:8px; font-size:12px; }
    .qr { text-align:right; }
    .qr img { height:70px; }
  </style>
</head>
<body>
  <div class="card">
    <div><strong>Guardian:</strong> ${data.student.guardianMobile ?? "-"}</div>
    <div><strong>Contact:</strong> ${data.school.contact ?? "-"}</div>
    <div><strong>Issued:</strong> ${data.meta.issueDate}</div>
    ${
      data.meta.expiryDate
        ? `<div><strong>Expiry:</strong> ${data.meta.expiryDate}</div>`
        : ""
    }

    <div class="qr">
      <img src="${data.qrBase64}" />
      <div>Scan to verify</div>
    </div>
  </div>
</body>
</html>`;
}
