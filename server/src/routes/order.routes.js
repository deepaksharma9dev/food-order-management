/**
 * Order Routes
 * 
 * Defines all API endpoints for order management.
 * Handles order creation, retrieval, and status updates.
 */

const express = require("express");

// Import order controller functions
const {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatusManually,
} = require("../controllers/order.controller");

// Initialize Express Router
const router = express.Router();

// ==================== Order Routes ====================

/**
 * POST /api/orders
 * Creates a new order with customer details and items
 * Controller: createOrder
 * Request Body: { customerName, address, phoneNumber, items[] }
 * Response: Created order with calculated total amount
 */
router.post("/", createOrder);

/**
 * GET /api/orders
 * Retrieves all orders from the database, sorted by creation date (newest first)
 * Controller: getOrders
 * Response: Array of all orders with their items
 */
router.get("/", getOrders);

/**
 * GET /api/orders/:id
 * Retrieves a specific order by its ID
 * Controller: getOrderById
 * Parameters: id (order ID)
 * Response: Single order object with full details
 */
router.get("/:id", getOrderById);

/**
 * PATCH /api/orders/:id/status
 * Updates the status of an existing order
 * Controller: updateOrderStatusManually
 * Parameters: id (order ID)
 * Request Body: { status } - Must be one of valid order statuses
 * Response: Updated order object
 */
router.patch("/:id/status", updateOrderStatusManually);

module.exports = router;