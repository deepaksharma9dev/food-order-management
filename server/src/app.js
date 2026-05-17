const express = require("express");
const cors = require("cors");

const menuRoutes = require("./routes/menu.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Food Order API Running",
  });
});

app.use("/api/menu", menuRoutes);

module.exports = app;