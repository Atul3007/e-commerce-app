const express = require("express");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const {
  createCategoryController,
  updatCategory,
  getCategory,
} = require("../controller/categoryController");

const categoryrouter = express.Router();

categoryrouter.post(
  "/create-category",
  requireSignin,
  checkRole,
  createCategoryController
);

categoryrouter.put("/update-category/:id", requireSignin, checkRole, updatCategory);

categoryrouter.get("/all",getCategory)

module.exports = {
  categoryrouter,
};
