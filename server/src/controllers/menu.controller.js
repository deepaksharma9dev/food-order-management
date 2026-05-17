/**
 * Menu Controller
 * 
 * Handles all business logic related to menu item operations.
 * Controllers act as intermediaries between routes and database operations.
 * 
 * Functions:
 * - seedMenu: Initializes database with sample menu items
 * - getMenu: Retrieves all available menu items
 */

const prisma = require("../config/prisma");
const menuData = require("../data/menuData");

// ==================== Menu Controller Functions ====================

/**
 * Seed Menu Items into Database
 * 
 * This function initializes the database with sample menu items.
 * It checks if menu items already exist to prevent duplicates.
 * Should be called once during application setup.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Success message and array of seeded menu items
 */
const seedMenu = async (req, res) => {
  try {
    // Check if menu items already exist in the database
    const count = await prisma.menuItem.count();

    // Only seed if the menu is empty (prevents duplicates)
    if (count === 0) {
      // Create multiple menu items from the seed data
      await prisma.menuItem.createMany({
        data: menuData,
      });
    }

    // Retrieve and return all menu items
    const items = await prisma.menuItem.findMany();

    return res.json({
      success: true,
      message: "Menu seeded successfully",
      data: items,
    });
  } catch (error) {
    console.error("Error seeding menu:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to seed menu",
      error: error.message,
    });
  }
};

/**
 * Get All Menu Items
 * 
 * Retrieves all available menu items from the database.
 * Items are sorted by creation date (oldest first).
 * Used to display the menu to customers on the frontend.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Array of all menu items
 */
const getMenu = async (req, res) => {
  try {
    // Fetch all menu items, sorted by creation time
    const items = await prisma.menuItem.findMany({
      orderBy: {
        createdAt: "asc", // Show items in order they were created
      },
    });

    return res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
};

module.exports = {
  seedMenu,
  getMenu,
};