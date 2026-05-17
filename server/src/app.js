/**
 * Express Application Configuration
 * 
 * This file sets up the Express.js application with middleware and route configurations.
 * It handles CORS, JSON parsing, and mounts API route handlers.
 */

const express = require("express");
const cors = require("cors");

// Import route handlers
const menuRoutes = require("./routes/menu.routes");
const orderRoutes = require("./routes/order.routes");

// Initialize Express application
const app = express();

// ==================== Middleware Setup ====================

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from different domains
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// ==================== Routes ====================

/**
 * Health Check Endpoint
 * GET /
 * Returns a simple success message to verify API is running
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Food Order API Running",
  });
});

// Mount menu-related API routes
// Handles: GET /api/menu, POST /api/menu/seed
app.use("/api/menu", menuRoutes);

// Mount order-related API routes
// Handles: POST /api/orders, GET /api/orders, GET /api/orders/:id, PATCH /api/orders/:id/status
app.use("/api/orders", orderRoutes);

module.exports = app;