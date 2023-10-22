const express=require("express");
const { createProduct } = require("../controller/productController");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const productRouter=express.Router();

productRouter.post("/create-product",requireSignin,checkRole,createProduct)

module.exports={
    productRouter
}