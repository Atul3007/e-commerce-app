const express=require("express");
const { createProduct, getProduct, getSingleProduct, getProductPhoto, deleteProduct, updateProduct, productFilter, productCount, productPerPage, searchProduct, relatedProduct } = require("../controller/productController");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");
const productRouter=express.Router();
const formidableMiddleware = require('express-formidable');

productRouter.post("/create-product",formidableMiddleware(),createProduct)

productRouter.put("/update-product/:pid",requireSignin,checkRole,formidableMiddleware(),updateProduct)

productRouter.get("/get-product",getProduct)

productRouter.get("/get-single-product/:pid",getSingleProduct)

productRouter.get("/product-photo/:pid",getProductPhoto)

productRouter.delete("/delete-product/:pid",deleteProduct)

productRouter.post("/product-filter",productFilter)

productRouter.get("/product-count",productCount)

productRouter.get("/product-list/:page",productPerPage)

productRouter.get("/search-product/:keyword",searchProduct)

productRouter.get("/related-product/:pid/:cid",relatedProduct)

module.exports={
    productRouter 
}