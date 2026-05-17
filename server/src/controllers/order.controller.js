const prisma = require("../config/prisma");
const {
  simulateOrderStatusUpdates,
  ORDER_STATUSES,
} = require("../services/orderStatus.service");

const createOrder = async (req, res) => {
  const { customerName, address, phoneNumber, items } = req.body;

  if (!customerName || !address || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Customer name, address and phone number are required",
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one order item is required",
    });
  }

  const menuItemIds = items.map((item) => item.menuItemId);

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: menuItemIds,
      },
    },
  });

  if (menuItems.length !== menuItemIds.length) {
    return res.status(400).json({
      success: false,
      message: "One or more menu items are invalid",
    });
  }

  const orderItems = items.map((item) => {
    const menuItem = menuItems.find(
      (menu) => menu.id === item.menuItemId
    );

    const quantity = Number(item.quantity);

    if (!quantity || quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    return {
      menuItemId: menuItem.id,
      quantity,
      price: menuItem.price,
    };
  });

  const totalAmount = orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      customerName,
      address,
      phoneNumber,
      totalAmount,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  const io = req.app.get("io");
  if (process.env.NODE_ENV !== "test") {
  simulateOrderStatus(order.id, io);
}

  return res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  return res.json({
    success: true,
    data: order,
  });
};

const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  return res.json({
    success: true,
    data: orders,
  });
};

const updateOrderStatusManually = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!ORDER_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status",
    });
  }

  const io = req.app.get("io");

  const order = await prisma.order.update({
    where: { id },
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
  io.to(id).emit("orderStatusUpdated", order);
}

  return res.json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatusManually,
};