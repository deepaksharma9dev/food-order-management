/**
 * Order Status Service
 * 
 * Handles order status management and transitions.
 * Provides functions to update order status and simulate automatic status changes.
 * 
 * Order Flow: Order Received → Preparing → Out for Delivery → Delivered
 */

const prisma = require("../config/prisma");

// ==================== Order Status Constants ====================

/**
 * Valid order statuses in the order lifecycle
 * These are the only statuses that an order can have
 */
const ORDER_STATUSES = [
  "Order Received",    // Customer has placed the order
  "Preparing",         // Kitchen is preparing the order
  "Out for Delivery",  // Order has left the restaurant
  "Delivered",         // Order has reached the customer
];

// ==================== Order Status Functions ====================

/**
 * Update Order Status
 * 
 * Updates an order's status in the database and notifies connected clients
 * via WebSocket about the status change.
 * 
 * @param {string} orderId - The ID of the order to update
 * @param {string} status - The new status (must be in ORDER_STATUSES array)
 * @param {Object} io - Socket.io instance for broadcasting updates
 * @returns {Promise<Object>} Updated order object with full details
 */
const updateOrderStatus = async (orderId, status, io) => {
  // Update order status in database
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  // Emit WebSocket event to notify all connected clients
  // io.to(orderId) sends the message only to clients in the order's room
  if (io) {
    io.to(orderId).emit("orderStatusUpdated", order);
  }

  return order;
};

/**
 * Simulate Automatic Order Status Updates
 * 
 * Simulates the order fulfillment process by automatically updating
 * the order status at specified intervals. This demonstrates the order
 * progression through different stages.
 * 
 * Timeline:
 * - 5 seconds: Order moves to "Preparing" status
 * - 10 seconds: Order moves to "Out for Delivery" status
 * - 15 seconds: Order moves to "Delivered" status
 * 
 * Note: This is a simulation for demo purposes. In production, these
 * status updates would be triggered by actual kitchen/delivery events.
 * 
 * @param {string} orderId - The ID of the order to simulate status updates for
 * @param {Object} io - Socket.io instance for broadcasting status updates
 */
const simulateOrderStatusUpdates = (orderId, io) => {
  // Update to "Preparing" status after 5 seconds
  setTimeout(() => {
    updateOrderStatus(orderId, "Preparing", io);
  }, 5000);

  // Update to "Out for Delivery" status after 10 seconds
  setTimeout(() => {
    updateOrderStatus(orderId, "Out for Delivery", io);
  }, 10000);

  // Update to "Delivered" status after 15 seconds
  setTimeout(() => {
    updateOrderStatus(orderId, "Delivered", io);
  }, 15000);
};

module.exports = {
  ORDER_STATUSES,
  updateOrderStatus,
  simulateOrderStatusUpdates,
};