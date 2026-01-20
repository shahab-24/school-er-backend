"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMarksheetHTML = renderMarksheetHTML;
function renderMarksheetHTML(data) {
    var rows = data.subjects
        .map(function (s) {
        var _a;
        return "\n      <tr>\n        <td>".concat((_a = s.subjectName) !== null && _a !== void 0 ? _a : s.subjectId, "</td>\n        <td>").concat(Object.entries(s.normalized)
            .map(function (_a) {
            var k = _a[0], v = _a[1];
            return "".concat(k, ": ").concat(v.toFixed(2));
        })
            .join("<br/>"), "</td>\n        <td>").concat(s.final.toFixed(2), "</td>\n        <td>").concat(s.failed ? "Fail" : "Pass", "</td>\n      </tr>");
    })
        .join("");
    return "\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\"/>\n  <title>Marksheet</title>\n  <style>\n    body { font-family: Arial, sans-serif; }\n    .header { display:flex; align-items:center; gap:16px; }\n    .logo { height:60px; }\n    table { width:100%; border-collapse:collapse; margin-top:16px; }\n    th, td { border:1px solid #333; padding:8px; }\n    .footer { margin-top:24px; display:flex; justify-content:space-between; }\n    .qr { margin-top:16px; text-align:right; }\n    .qr img { height:90px; }\n  </style>\n</head>\n<body>\n  <div class=\"header\">\n    ".concat(data.school.logoUrl
        ? "<img class=\"logo\" src=\"".concat(data.school.logoUrl, "\"/>")
        : "", "\n    <div>\n      <h2>").concat(data.school.nameEn, "</h2>\n      ").concat(data.school.nameBn ? "<div>".concat(data.school.nameBn, "</div>") : "", "\n      ").concat(data.school.address ? "<div>".concat(data.school.address, "</div>") : "", "\n    </div>\n  </div>\n\n  <hr/>\n\n  <h3>\n    ").concat(data.meta.scope === "terminal" ? "Terminal" : "Annual", " Marksheet\n    ").concat(data.meta.terminalLabel ? "(".concat(data.meta.terminalLabel, ")") : "", "\n  </h3>\n\n  <div>\n    <strong>Student ID:</strong> ").concat(data.student.studentId, "<br/>\n    ").concat(data.student.nameEn
        ? "<strong>Name (EN):</strong> ".concat(data.student.nameEn, "<br/>")
        : "", "\n    ").concat(data.student.nameBn
        ? "<strong>Name (BN):</strong> ".concat(data.student.nameBn, "<br/>")
        : "", "\n    <strong>Class:</strong> ").concat(data.meta.class, " |\n    <strong>Session:</strong> ").concat(data.meta.session, "\n  </div>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Subject</th>\n        <th>Breakdown</th>\n        <th>Final</th>\n        <th>Status</th>\n      </tr>\n    </thead>\n    <tbody>\n      ").concat(rows, "\n    </tbody>\n  </table>\n\n  <div class=\"summary\">\n    <strong>Total:</strong> ").concat(data.summary.total.toFixed(2), "<br/>\n    <strong>Percentage:</strong> ").concat(data.summary.percentage.toFixed(2), "%<br/>\n    <strong>Status:</strong> ").concat(data.summary.failed ? "Fail" : "Pass", "<br/>\n    ").concat(data.meta.position
        ? "<strong>Position:</strong> ".concat(data.meta.position)
        : "", "\n  </div>\n\n  <div class=\"footer\">\n    <div>Class Teacher</div>\n    <div>Head Teacher</div>\n  </div>\n\n  ").concat(data.qrBase64
        ? "\n    <div class=\"qr\">\n      <img src=\"".concat(data.qrBase64, "\" />\n      <div style=\"font-size:12px;\">Scan to verify</div>\n    </div>\n  ")
        : "", "\n\n</body>\n</html>");
}
