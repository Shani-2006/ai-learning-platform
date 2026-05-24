/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *
 * /api/categories/subcategories:
 *   post:
 *     summary: Create subcategory
 *     tags: [Categories]
 *
 *   get:
 *     summary: Get all subcategories
 *     tags: [Categories]
 */

const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  createSubCategory,
  getSubCategories
} = require("../controllers/categoryController");

router.post("/", createCategory);
router.get("/", getCategories);

router.post("/subcategories", createSubCategory);
router.get("/subcategories", getSubCategories);

module.exports = router;