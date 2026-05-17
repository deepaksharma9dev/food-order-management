const prisma = require("../config/prisma");

const ORDER_STATUSES = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

const updateOrderStatus = async (orderId, status, io) => {
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

  if (io) {
    io.to(orderId).emit("orderStatusUpdated", order);
  }

  return order;
};

const simulateOrderStatusUpdates = (orderId, io) => {

  setTimeout(() => {
    updateOrderStatus(orderId, "Preparing", io);
  }, 5000);

  setTimeout(() => {
    updateOrderStatus(orderId, "Out for Delivery", io);
  }, 10000);

  setTimeout(() => {
    updateOrderStatus(orderId, "Delivered", io);
  }, 15000);
};

module.exports = {
  ORDER_STATUSES,
  updateOrderStatus,
  simulateOrderStatusUpdates,
};