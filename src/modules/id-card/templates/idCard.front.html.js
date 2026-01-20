"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderIDCardFront = renderIDCardFront;
function renderIDCardFront(data) {
    var _a, _b, _c, _d;
    var name = (_a = data.student.name.en) !== null && _a !== void 0 ? _a : Object.values(data.student.name)[0];
    return "\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\"/>\n  <style>\n    body { font-family: Arial, sans-serif; width: 320px; height: 200px; }\n    .card { border:1px solid #333; padding:8px; }\n    .header { display:flex; align-items:center; gap:8px; }\n    .logo { height:36px; }\n    .photo { height:70px; border:1px solid #999; }\n    .row { font-size:12px; margin-top:4px; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <div class=\"header\">\n      ".concat(data.school.logoUrl
        ? "<img class=\"logo\" src=\"".concat(data.school.logoUrl, "\"/>")
        : "", "\n      <div>\n        <strong>").concat((_b = data.school.name.en) !== null && _b !== void 0 ? _b : "School", "</strong><br/>\n        <small>").concat((_c = data.school.address) !== null && _c !== void 0 ? _c : "", "</small>\n      </div>\n    </div>\n\n    <hr/>\n\n    <div style=\"display:flex; gap:8px;\">\n      ").concat(data.student.imageUrl
        ? "<img class=\"photo\" src=\"".concat(data.student.imageUrl, "\"/>")
        : "", "\n      <div>\n        <div class=\"row\"><strong>Name:</strong> ").concat(name, "</div>\n        <div class=\"row\"><strong>ID:</strong> ").concat(data.student.studentUid, "</div>\n        <div class=\"row\"><strong>Class:</strong> ").concat(data.student.class, "</div>\n        <div class=\"row\"><strong>Roll:</strong> ").concat((_d = data.student.roll) !== null && _d !== void 0 ? _d : "-", "</div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>");
}
