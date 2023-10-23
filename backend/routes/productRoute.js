const express=require("express");
const { createProduct, getProduct } = require("../controller/productController");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const productRouter=express.Router();
const formidableMiddleware = require('express-formidable');

productRouter.post("/create-product",requireSignin,checkRole,formidableMiddleware(),createProduct)

productRouter.get("/get-product",getProduct)

module.exports={
    productRouter
}