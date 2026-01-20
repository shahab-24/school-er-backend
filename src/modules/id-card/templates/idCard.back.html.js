"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderIDCardBack = renderIDCardBack;
function renderIDCardBack(data) {
    var _a, _b;
    return "\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\"/>\n  <style>\n    body { font-family: Arial, sans-serif; width: 320px; height: 200px; }\n    .card { border:1px solid #333; padding:8px; font-size:12px; }\n    .qr { text-align:right; }\n    .qr img { height:70px; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <div><strong>Guardian:</strong> ".concat((_a = data.student.guardianMobile) !== null && _a !== void 0 ? _a : "-", "</div>\n    <div><strong>Contact:</strong> ").concat((_b = data.school.contact) !== null && _b !== void 0 ? _b : "-", "</div>\n    <div><strong>Issued:</strong> ").concat(data.meta.issueDate, "</div>\n    ").concat(data.meta.expiryDate
        ? "<div><strong>Expiry:</strong> ".concat(data.meta.expiryDate, "</div>")
        : "", "\n\n    <div class=\"qr\">\n      <img src=\"").concat(data.qrBase64, "\" />\n      <div>Scan to verify</div>\n    </div>\n  </div>\n</body>\n</html>");
}
