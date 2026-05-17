const express = require("express");
const {
  seedMenu,
  getMenu,
} = require("../controllers/menu.controller");

const router = express.Router();

router.post("/seed", seedMenu);
router.get("/", getMenu);

module.exports = router;