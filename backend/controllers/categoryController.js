const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      message: "Category created successfully",
      category
    });
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const createSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        message: "Name and categoryId are required"
      });
    }

    const subCategory = await SubCategory.create({
      name,
      categoryId
    });

    res.status(201).json({
      message: "SubCategory created successfully",
      subCategory
    });
  } catch (err) {
    next(err);
  }
};

const getSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find().populate("categoryId");
    res.json(subCategories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
  createSubCategory,
  getSubCategories
};