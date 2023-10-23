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

const getProduct = async (req, res) => {
  try {
    const product = await productModel.find({}).select("-photo").limit(10).sort({createdAt:-1});
    res.status(200).send({
        success: true,
        message: product,
        total_count : product.length
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in getting product",
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
};
