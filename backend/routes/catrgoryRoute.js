const express = require("express");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const {
  createCategoryController,
  updatCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
} = require("../controller/categoryController");

const categoryrouter = express.Router();

categoryrouter.post(
  "/create-category",
  requireSignin,
  checkRole,
  createCategoryController
);

categoryrouter.put("/update-category/:id", requireSignin, checkRole, updatCategory);

categoryrouter.get("/single-category/:slug",getSingleCategory)

categoryrouter.get("/all",getCategory)

categoryrouter.delete("/delete-category/:id",deleteCategory)

module.exports = {
  categoryrouter,
};
