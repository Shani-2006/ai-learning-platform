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

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      message: "Category updated successfully",
      category
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    await SubCategory.deleteMany({ categoryId: id });
    await Category.findByIdAndDelete(id);

    res.json({
      message: "Category and related subcategories deleted successfully"
    });
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

const updateSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "SubCategory name is required" });
    }

    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    res.json({
      message: "SubCategory updated successfully",
      subCategory
    });
  } catch (err) {
    next(err);
  }
};

const deleteSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(404).json({
        message: "SubCategory not found"
      });
    }

    await SubCategory.findByIdAndDelete(id);

    res.json({
      message: "SubCategory deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
};