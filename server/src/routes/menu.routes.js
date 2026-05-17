/**
 * Menu Routes
 * 
 * Defines all API endpoints related to menu management.
 * These routes handle retrieving menu items and seeding initial menu data.
 */

const express = require("express");
const {
  seedMenu,
  getMenu,
} = require("../controllers/menu.controller");

// Initialize Express Router
const router = express.Router();

// ==================== Menu Routes ====================

/**
 * POST /api/menu/seed
 * Seeds the database with initial menu items if the menu is empty
 * Controller: seedMenu
 * Response: Array of menu items
 */
router.post("/seed", seedMenu);

/**
 * GET /api/menu
 * Retrieves all available menu items from the database
 * Controller: getMenu
 * Response: Array of menu items with pagination/filtering support
 */
router.get("/", getMenu);

module.exports = router;