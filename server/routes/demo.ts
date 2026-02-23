import { RequestHandler } from "express";

// Removed the broken @shared/api import to fix the Render build error
export const handleDemo: RequestHandler = (req, res) => {
  // Using a standard object structure for the response
  const response = {
    message: "Hello from Express server",
    status: "online",
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(response);
};
