const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
} = require("../controllers/categoryController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createCategory);
router.get("/", getCategories);

router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

router.post(
  "/subcategories",
  authMiddleware,
  adminMiddleware,
  createSubCategory
);

router.get("/subcategories", getSubCategories);

router.put(
  "/subcategories/:id",
  authMiddleware,
  adminMiddleware,
  updateSubCategory
);

router.delete(
  "/subcategories/:id",
  authMiddleware,
  adminMiddleware,
  deleteSubCategory
);

module.exports = router;