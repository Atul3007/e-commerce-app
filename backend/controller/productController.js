const { productModel } = require("../models/productModel");
const { default: slugify } = require("slugify");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, shipping } = req.fields;
    const { photo } = req.files;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !shipping ||
      !photo ||
      photo.size > 1000000
    ) {
      return res.status(400).send({
        message: "all fields required and pic size should be less than 1mb",
      });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.contentType = photo.type;
    }
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in creating product",
    });
  }
};

const updateProduct = async (req, res) => {
    try {
      const id=req.params.pid;  
      const { name, slug, description, price, category, shipping } = req.fields;
      const { photo } = req.files;
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !shipping ||
        !photo ||
        photo.size > 1000000
      ) {
        return res.status(400).send({
          message: "all fields required and pic size should be less than 1mb",
        });
      }
      const product =await productModel.findByIdAndUpdate(id,{...req.fields, slug: slugify(name)})  
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.contentType = photo.type;
      }
      await product.save();
  
      res.status(201).json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        error: error.message,
        message: "Error in updating product",
      });
    }
  };

const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: product,
      total_count: product.length,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in getting product",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    if (!product) {
      res.status(401).send({
        success: false,
        error: error.message,
        message: "product not exist",
      });
      return;
    } else {
      res.status(200).send({
        success: true,
        message: product,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in getting single product",
    });
  }
};

const getProductPhoto = async (req, res) => {
  try {
    const id = req.params.pid;
    const ProductPhoto = await productModel.findById(id).select("photo");
   // console.log(ProductPhoto.photo.data)
    if(ProductPhoto.photo.data){
        res.set('Content-type',ProductPhoto.photo.contentType);
        return res.status(200).send(ProductPhoto.photo.data)
    }else{
      console.log("error")
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in getting product photo",
    });
  }
};

const deleteProduct=async(req,res)=>{
    try {
        const id=req.params.pid;
        const deleteProduct=await productModel.findByIdAndDelete(id).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
          });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
            message: "Error in deleting product",
          }); 
    }
}

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getSingleProduct,
  getProductPhoto,
  deleteProduct
};
