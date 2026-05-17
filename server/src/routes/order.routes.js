const express = require("express");

const {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatusManually,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatusManually);

module.exports = router;