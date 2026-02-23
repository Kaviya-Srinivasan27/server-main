import "dotenv/config";
import express from "express";
import cors from "cors";

// Import your new database connection
import { connectDB } from "./db/connect";

// FIX: Remove the .js extensions from these local imports
import { handleDemo } from "./routes/demo";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import notificationsRouter from "./routes/notifications";

export function createServer() {
  const app = express();

  // Trigger the database connection when the server starts
  connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root route
  app.get("/", (_req, res) => {
    res.send("Backend is running and connected to Neon 🚀");
  });

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/auth", authRouter);
  app.use("/api/products", productsRouter);

  // Notifications routes
  console.log("Notifications router mounted");
  app.use("/api/notifications", notificationsRouter);

  return app;
}