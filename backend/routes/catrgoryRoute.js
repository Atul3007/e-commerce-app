const express = require("express");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const {
  createCategoryController,
} = require("../controller/categoryController");

const categoryrouter = express.Router();

categoryrouter.post(
  "/create-category",
  requireSignin,
  checkRole,
  createCategoryController
);

module.exports={
    categoryrouter
}