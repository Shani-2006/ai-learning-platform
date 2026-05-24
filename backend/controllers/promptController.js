const Prompt = require("../models/Prompt");
const User = require("../models/User");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const { generateLesson } = require("../services/aiService");

const createPrompt = async (req, res, next) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({
        message: "userId, categoryId, subCategoryId and prompt are required"
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
    const prompts = await Prompt.find()
      .populate("userId")
      .populate("categoryId")
      .populate("subCategoryId")
      .sort({ createdAt: -1 });

    res.json(prompts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPrompt,
  getUserPromptHistory,
  getAllPrompts
};