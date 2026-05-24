/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Submit prompt to AI
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - subCategoryId
 *               - prompt
 *             properties:
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               prompt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prompt submitted successfully
 *
 * /api/prompts/history/{userId}:
 *   get:
 *     summary: Get user prompt history
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *
 * /api/prompts/admin/all:
 *   get:
 *     summary: Get all prompts (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 */
const express = require("express");
const router = express.Router();

const {
  createPrompt,
  getUserPromptHistory,
  getAllPrompts
} = require("../controllers/promptController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/", authMiddleware, createPrompt);

router.get(
  "/history/:userId",
  authMiddleware,
  getUserPromptHistory
);

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllPrompts
);

module.exports = router;