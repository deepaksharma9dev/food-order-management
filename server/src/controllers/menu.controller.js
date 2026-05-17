const prisma = require("../config/prisma");
const menuData = require("../data/menuData");

const seedMenu = async (req, res) => {
  const count = await prisma.menuItem.count();

  if (count === 0) {
    await prisma.menuItem.createMany({
      data: menuData,
    });
  }

  const items = await prisma.menuItem.findMany();

  return res.json({
    success: true,
    message: "Menu seeded successfully",
    data: items,
  });
};

const getMenu = async (req, res) => {
  const items = await prisma.menuItem.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return res.json({
    success: true,
    data: items,
  });
};

module.exports = {
  seedMenu,
  getMenu,
};