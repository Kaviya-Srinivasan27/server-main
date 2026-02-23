import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect";
import { handleDemo } from "./routes/demo";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import notificationsRouter from "./routes/notifications";

export function createServer() {
  const app = express();

  // Trigger database connection
  connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get("/", (_req, res) => {
    res.send("Backend is running and connected to Neon 🚀");
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/auth", authRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/notifications", notificationsRouter);

  return app;
}

const app = createServer();
// FIX: Convert string to number for TypeScript compliance
const PORT = Number(process.env.PORT) || 10000;

// FIX: Bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend is running on port ${PORT} and connected to Neon 🚀`);
});