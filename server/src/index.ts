import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes/index";
// import database from "./config/database";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Connect to database


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from /a route!");
});

// API Routes
app.use("/v1", routes);

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
