const Prompt = require("../models/Prompt");
const User = require("../models/User");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const { generateLesson } = require("../services/aiService");

const createPrompt = async (req, res, next) => {
  try {
    const { categoryId, subCategoryId, prompt } = req.body;
    const userId = req.user.userId;

    if (!categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({
        message: "categoryId, subCategoryId and prompt are required"
      });
    }

    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!user || !category || !subCategory) {
      return res.status(404).json({
        message: "User, category or sub-category not found"
      });
    }

    const aiResponse = await generateLesson({
      categoryName: category.name,
      subCategoryName: subCategory.name,
      prompt
    });

    const savedPrompt = await Prompt.create({
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response: aiResponse
    });

    res.status(201).json({
      message: "Prompt submitted successfully",
      data: savedPrompt
    });
  } catch (err) {
    next(err);
  }
};

const getUserPromptHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (
      req.user.role !== "admin" &&
      req.user.userId !== userId
    ) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const history = await Prompt.find({ userId })
      .populate("categoryId")
      .populate("subCategoryId")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    next(err);
  }
};

const getAllPrompts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const userId = req.query.userId;

    const filter = {};

    if (userId) {
      filter.userId = userId;
    }

    const skip = (page - 1) * limit;

    const total = await Prompt.countDocuments(filter);

    const prompts = await Prompt.find(filter)
      .populate("userId", "-password")
      .populate("categoryId")
      .populate("subCategoryId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      prompts
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPrompt,
  getUserPromptHistory,
  getAllPrompts
};