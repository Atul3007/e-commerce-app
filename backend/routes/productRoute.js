const express=require("express");
const { createProduct, getProduct, getSingleProduct, getProductPhoto, deleteProduct, updateProduct } = require("../controller/productController");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const productRouter=express.Router();
const formidableMiddleware = require('express-formidable');

productRouter.post("/create-product",formidableMiddleware(),createProduct)

productRouter.put("/update-product/:pid",requireSignin,checkRole,formidableMiddleware(),updateProduct)

productRouter.get("/get-product",getProduct)

productRouter.get("/get-single-product/:slug",getSingleProduct)

productRouter.get("/product-photo/:pid",getProductPhoto)

productRouter.delete("/delete-product/:pid",deleteProduct)

module.exports={
    productRouter 
}