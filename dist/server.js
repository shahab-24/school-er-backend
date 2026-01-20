"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        console.log("🚀 Starting server...");
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
        app_1.default.listen(PORT, () => {
            console.log(`✅ Server listening on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Server failed to start", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map