"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
// import database from "./config/database";
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Connect to database
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON request bodies
// Health Check Route
app.get("/", (req, res) => {
    res.send("Hello from /a route!");
});
// API Routes
app.use("/v1", index_1.default);
// Error Handling Middleware
app.use((err, req, res, next) => {
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
