const { default: slugify } = require("slugify");
const { categoryModel } = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).send({ message: 'Please enter the category name' });
            return; // Exit the function to prevent further response attempts
        }

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            res.status(409).send({
                message: 'Category name already exists',
                success: false
            });
            return; // Exit the function to prevent further response attempts
        }

        const category = new categoryModel({ name, slug: slugify(name) });
        await category.save();

        res.status(201).send({
            message: 'Category added successfully',
            success: true,
            data: category
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in category"
        });
    }
};

module.exports = {
    createCategoryController 
};
