"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderIDCardFront = renderIDCardFront;
function renderIDCardFront(data) {
    const name = data.student.name.en ?? Object.values(data.student.name)[0];
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: Arial, sans-serif; width: 320px; height: 200px; }
    .card { border:1px solid #333; padding:8px; }
    .header { display:flex; align-items:center; gap:8px; }
    .logo { height:36px; }
    .photo { height:70px; border:1px solid #999; }
    .row { font-size:12px; margin-top:4px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      ${data.school.logoUrl
        ? `<img class="logo" src="${data.school.logoUrl}"/>`
        : ""}
      <div>
        <strong>${data.school.name.en ?? "School"}</strong><br/>
        <small>${data.school.address ?? ""}</small>
      </div>
    </div>

    <hr/>

    <div style="display:flex; gap:8px;">
      ${data.student.imageUrl
        ? `<img class="photo" src="${data.student.imageUrl}"/>`
        : ""}
      <div>
        <div class="row"><strong>Name:</strong> ${name}</div>
        <div class="row"><strong>ID:</strong> ${data.student.studentUid}</div>
        <div class="row"><strong>Class:</strong> ${data.student.class}</div>
        <div class="row"><strong>Roll:</strong> ${data.student.roll ?? "-"}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
//# sourceMappingURL=idCard.front.html.js.map