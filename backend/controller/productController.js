const { productModel } = require("../models/productModel");
const { default: slugify } = require("slugify");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, shipping, quantity } =
      req.fields;
    const { photo } = req.files;
    // console.log(req.files,req.fields)
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
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
      product.photo.contentType = photo.type;
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
    const id = req.params.pid;
    const { name, slug, description, price, category, shipping, quantity } =
      req.fields;
    const { photo } = req.files;
    console.log(id, name, photo);
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !shipping ||
      !quantity ||
      !photo ||
      photo.size > 1000000
    ) {
      return res.status(400).send({
        message: "all fields required and pic size should be less than 1mb",
      });
    }
    const product = await productModel.findByIdAndUpdate(id, {
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
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
    const id = req.params.pid;
    const product = await productModel
      .findById(id)
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
    if (ProductPhoto.photo.data) {
      res.set("Content-type", ProductPhoto.photo.contentType);
      return res.status(200).send(ProductPhoto.photo.data);
    } else {
      console.log("error");
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in getting product photo",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    const deleteProduct = await productModel
      .findByIdAndDelete(id)
      .select("-photo");
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
};

const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const obj = {};
    if (checked) {
      obj.category = checked;
    }
    if (radio) {
      obj.price = { $gte: radio[0], $lte: radio[1] };
    }
    const product = await productModel.find(obj);
    // console.log(product)
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in filtering product",
    });
  }
};

const productCount = async (req, res) => {
  try {
    const count = await productModel.estimatedDocumentCount();
    res.status(200).send({
      success: true,
      count,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in counting product",
    });
  }
};

const productPerPage = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in counting product",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const product = await productModel.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
          description: { $regex: keyword, $options: "i" },
        },
      ],
    });
    res.status(200).send({ success: true, product });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in searching products",
    });
  }
};


const relatedProduct=async(req,res)=>{
  try {
    const {pid,cid}=req.params;
    //console.log(pid,cid)
    const products=await productModel.find({
      category:cid,
      _id:{$ne:pid}
    }).select("-photo").limit(5).populate("category");
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Error in getting related products",
    });
  }
}

module.exports = {
  relatedProduct,
  searchProduct,
  productPerPage,
  productCount,
  productFilter,
  createProduct,
  updateProduct,
  getProduct,
  getSingleProduct,
  getProductPhoto,
  deleteProduct,
};
