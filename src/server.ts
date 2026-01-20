import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🚀 Starting server...");

    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start", err);
    process.exit(1);
  }
}

startServer();
