const request = require("supertest");

const app = require("../app");
const prisma = require("../config/prisma");

describe("Order Management APIs", () => {
  let menuItem;

  beforeAll(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();

    menuItem = await prisma.menuItem.create({
      data: {
        name: "Test Pizza",
        description: "Test cheese pizza",
        price: 299,
        image: "https://example.com/pizza.jpg",
      },
    });
  });

  afterAll(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.$disconnect();
  });

  test("should get menu items", async () => {
    const res = await request(app).get("/api/menu");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("should not create order without delivery details", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({
        items: [
          {
            menuItemId: menuItem.id,
            quantity: 1,
          },
        ],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should not create order with invalid menu item", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({
        customerName: "Deepak",
        phoneNumber: "9999999999",
        address: "Delhi",
        items: [
          {
            menuItemId: "invalid-id",
            quantity: 1,
          },
        ],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should create an order successfully", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({
        customerName: "Deepak",
        phoneNumber: "9999999999",
        address: "Delhi",
        items: [
          {
            menuItemId: menuItem.id,
            quantity: 2,
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.customerName).toBe("Deepak");
    expect(res.body.data.items.length).toBe(1);
    expect(res.body.data.totalAmount).toBe(598);
  });

  test("should get order by id", async () => {
    const order = await prisma.order.create({
      data: {
        customerName: "Rahul",
        phoneNumber: "8888888888",
        address: "Mumbai",
        totalAmount: 299,
        items: {
          create: [
            {
              menuItemId: menuItem.id,
              quantity: 1,
              price: menuItem.price,
            },
          ],
        },
      },
    });

    const res = await request(app).get(`/api/orders/${order.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(order.id);
  });

  test("should update order status", async () => {
    const order = await prisma.order.create({
      data: {
        customerName: "Amit",
        phoneNumber: "7777777777",
        address: "Pune",
        totalAmount: 299,
        items: {
          create: [
            {
              menuItemId: menuItem.id,
              quantity: 1,
              price: menuItem.price,
            },
          ],
        },
      },
    });

    const res = await request(app)
      .patch(`/api/orders/${order.id}/status`)
      .send({
        status: "Preparing",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("Preparing");
  });

  test("should reject invalid order status", async () => {
    const order = await prisma.order.create({
      data: {
        customerName: "Test User",
        phoneNumber: "7777777777",
        address: "Pune",
        totalAmount: 299,
        items: {
          create: [
            {
              menuItemId: menuItem.id,
              quantity: 1,
              price: menuItem.price,
            },
          ],
        },
      },
    });

    const res = await request(app)
      .patch(`/api/orders/${order.id}/status`)
      .send({
        status: "Invalid Status",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});