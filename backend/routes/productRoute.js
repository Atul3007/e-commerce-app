const express=require("express");
const { createProduct } = require("../controller/productController");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const productRouter=express.Router();
const formidableMiddleware = require('express-formidable');

productRouter.post("/create-product",requireSignin,checkRole,formidableMiddleware(),createProduct)

module.exports={
    productRouter
}