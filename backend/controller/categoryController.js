const { default: slugify } = require("slugify");
const { categoryModel } = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ message: "Please enter the category name" });
      return; // Exit the function to prevent further response attempts
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      res.status(409).send({
        message: "Category name already exists",
        success: false,
      });
      return; // Exit the function to prevent further response attempts
    }

    const category = new categoryModel({ name, slug: slugify(name) });
    await category.save();

    res.status(201).send({
      message: "Category added successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in category",
    });
  }
};

const updatCategory = async (req, res) => {
  try {
    const {name}=req.body;
    const {id}=req.params;
    //console.log(name,id)
    const category=await categoryModel.findByIdAndUpdate(id,{name,slug: slugify(name)})
    res.status(200).send({
        message:"Update successfull!!"
    })
  } catch (error) {
    res.status(400).send({
        success: false,
        error: error.message,
        message: "Error in updating category",
      });
  }
};

const getCategory=async(req,res)=>{
    try {
        const category=await categoryModel.find({});
        console.log(category)
        res.status(200).send({
            message:"Category in console"
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
            message: "Error in getting category",
          });
    }
}

module.exports = {
  createCategoryController,
  updatCategory,
  getCategory
};
